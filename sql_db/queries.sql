CREATE TABLE IF NOT EXISTS companies
(
    id         SERIAL PRIMARY KEY,
    name       varchar(50) NOT NULL,
    created_at TIMESTAMP default current_timestamp
);

CREATE TABLE IF NOT EXISTS tasks
(
    id          SERIAL PRIMARY KEY,
    title       VARCHAR(250) NOT NULL,
    description TEXT         NOT NULL,
    company_id  INT          NOT NULL,
    parent_id   INT       default NULL,
    day         INT          NOT NULL,
    created_at  timestamp default current_timestamp
);


ALTER TABLE tasks
    ADD CONSTRAINT fk_company_id FOREIGN KEY (company_id) REFERENCES companies (id);
ALTER TABLE tasks
    ADD CONSTRAINT fk_parent_id FOREIGN KEY (parent_id) REFERENCES tasks (id);


CREATE TABLE IF NOT EXISTS users
(
    id         SERIAL PRIMARY KEY,
    login      VARCHAR(50) UNIQUE NOT NULL,
    password   VARCHAR(800)       NOT NULL,
    company_id INT                NOT NULL,
    role       VARCHAR(50)        NOT NULL,
    created_at timestamp default current_timestamp
);


ALTER TABLE users
    ADD CONSTRAINT fk_company_id FOREIGN KEY (company_id) REFERENCES companies (id);


CREATE TABLE IF NOT EXISTS user_tasks
(
    id           SERIAL PRIMARY KEY,
    user_id      INT  NOT NULL,
    task_id      INT  NOT NULL,
    start_date   DATE NOT NULL,
    end_date     DATE NOT NULL,
    started_date DATE      default NULL,
    ended_date   DATE      default NULL,
    created_date TIMESTAMP default current_timestamp
);

ALTER TABLE user_tasks
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (id);

ALTER TABLE user_tasks
    ADD CONSTRAINT fk_task_id FOREIGN KEY (task_id) REFERENCES tasks (id);



-- AUDIT USERS --
CREATE TABLE IF NOT EXISTS audit_users
(
    id         INT,
    login      VARCHAR(50) NOT NULL,
    password   TEXT        NOT NULL,
    role       VARCHAR(50) NOT NULL,
    full_name  VARCHAR(80) NOT NULL,
    company_id INT         NOT NULL,
    status     VARCHAR(80) NOT NULL,
    created_at TIMESTAMP DEFAULT current_timestamp
);

CREATE OR REPLACE FUNCTION audit_users_function()
    RETURNS TRIGGER AS
$$
BEGIN
    INSERT INTO audit_users (id, login, password, role, full_name, company_id, status)
    VALUES (coalesce(NEW.id, old.id),
            COALESCE(NEW.login, OLD.login),
            COALESCE(NEW.password, OLD.password),
            COALESCE(NEW.role, OLD.role),
            COALESCE(NEW.full_name, OLD.full_name),
            COALESCE(NEW.company_id, OLD.company_id),
            CASE
                WHEN TG_OP = 'INSERT' THEN 'INSERT'
                WHEN TG_OP = 'UPDATE' THEN 'UPDATE'
                WHEN TG_OP = 'DELETE' THEN 'DELETE'
                END);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER audit_users_trigger
    AFTER INSERT OR UPDATE OR DELETE
    ON users
    FOR EACH ROW
EXECUTE FUNCTION audit_users_function();


-- AUDIT COMPANIES --
CREATE TABLE IF NOT EXISTS audit_companies
(
    id         INT,
    name       VARCHAR(80) NOT NULL,
    status     VARCHAR(80) NOT NULL,
    created_at timestamp default current_timestamp
);

CREATE OR REPLACE FUNCTION audit_companies_function()
    RETURNS TRIGGER AS
$$
BEGIN
    INSERT INTO audit_companies (id, name, status)
    VALUES (coalesce(NEW.id, old.id),
            COALESCE(NEW.name, OLD.name),
            CASE
                WHEN TG_OP = 'INSERT' THEN 'INSERT'
                WHEN TG_OP = 'UPDATE' THEN 'UPDATE'
                WHEN TG_OP = 'DELETE' THEN 'DELETE'
                END);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER audit_companies_trigger
    AFTER INSERT OR UPDATE OR DELETE
    ON companies
    FOR EACH ROW
EXECUTE FUNCTION audit_companies_function();

