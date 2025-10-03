const request = require("supertest");
const express = require("express");
const SessionsController = require("../controllers/SessionsController");

// Mock do model e da config de auth
jest.mock("../model/FuncionariosModel");
jest.mock("../../config/auth", () => ({
  secret: "test-secret",
  expiresIn: "1h",
}));

const FuncionariosModel = require("../model/FuncionariosModel");

// Criar app de teste com express
const app = express();
app.use(express.json());
app.post("/sessions", (req, res) => SessionsController.create(req, res));

describe("SessionsController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar erro se o funcionário não for encontrado", async () => {
    FuncionariosModel.findByEmail.mockResolvedValue([]);

    const response = await request(app)
      .post("/sessions")
      .send({ email: "naoexiste@teste.com", password: "123" });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Funcionario não encontrado");
  });

  it("deve retornar erro se a senha estiver incorreta", async () => {
    FuncionariosModel.findByEmail.mockResolvedValue([{ id: 1, name: "João" }]);
    FuncionariosModel.getPassword.mockResolvedValue("senhaCorreta");

    const response = await request(app)
      .post("/sessions")
      .send({ email: "joao@teste.com", password: "senhaErrada" });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Senha incorreta");
  });

  it("deve retornar token se login for bem-sucedido", async () => {
    FuncionariosModel.findByEmail.mockResolvedValue([{ id: 1, name: "João", email: "joao@teste.com" }]);
    FuncionariosModel.getPassword.mockResolvedValue("123456");

    const response = await request(app)
      .post("/sessions")
      .send({ email: "joao@teste.com", password: "123456" });

    expect(response.status).toBe(200);
    expect(response.body.user).toEqual({
      id: 1,
      name: "João",
      email: "joao@teste.com",
    });
    expect(response.body.token).toBeDefined();
  });
});
