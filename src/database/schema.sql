CREATE DATABASE darshan;

CREATE TABLE IF NOT EXISTS public.produtos
(
    prod_id integer NOT NULL DEFAULT nextval('produtos_prod_id_seq'::regclass),
    prod_name character varying COLLATE pg_catalog."default" NOT NULL,
    prod_price double precision NOT NULL,
    prod_desc character varying COLLATE pg_catalog."default" NOT NULL,
    prod_type character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT produtos_pkey PRIMARY KEY (prod_id)
);

CREATE TABLE IF NOT EXISTS public.funcionarios
(
    func_id integer NOT NULL DEFAULT nextval('funcionarios_func_id_seq'::regclass),
    func_name character varying COLLATE pg_catalog."default" NOT NULL,
    func_email character varying COLLATE pg_catalog."default" NOT NULL,
    func_password character varying COLLATE pg_catalog."default" NOT NULL,
    func_level integer NOT NULL,
    CONSTRAINT funcionarios_pkey PRIMARY KEY (func_id)
);
