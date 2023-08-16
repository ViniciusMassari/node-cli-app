const { deepEqual } = require('assert');
const database = require('./database');
const DEFAULT_ITEMS_CADASTRAR = { nome: 'Flash', poder: 'Speed', id: 1 };
const DEFAULT_ITEMS_ATUALIZAR = {
  nome: 'Lanterna verde',
  poder: 'Energia do anel',
  id: 2,
};

describe('Suite de manipulação de heróis =>', () => {
  before(async () => {
    // cadastra um obj padrão que pode ser modificado
    await database.cadastrar(DEFAULT_ITEMS_CADASTRAR);
    await database.cadastrar(DEFAULT_ITEMS_ATUALIZAR);
  });
  it('deve pesquisar um herói usando arquivos', async () => {
    const expected = DEFAULT_ITEMS_CADASTRAR;
    const [resultado] = await database.listar(expected.id);
    deepEqual(resultado, expected);
  });
  it('deve cadastrar um herói usando arquivos', async () => {
    const expected = DEFAULT_ITEMS_CADASTRAR;

    const [actual] = await database.listar(DEFAULT_ITEMS_CADASTRAR.id);
    deepEqual(actual, expected);
  });

  it('deve atualizar um herói pelo id', async () => {
    const expected = {
      ...DEFAULT_ITEMS_ATUALIZAR,
      nome: 'Batman',
      poder: 'Dinheiro',
    };

    const novoDado = { nome: 'Batman', poder: 'Dinheiro' };
    await database.atualizar(DEFAULT_ITEMS_ATUALIZAR.id, novoDado);
    const [resultado] = await database.listar(DEFAULT_ITEMS_ATUALIZAR.id);

    deepEqual(resultado, expected);
  });

  it('deve remover um herói por id', async () => {
    const expected = true;
    const resultado = await database.remover(
      DEFAULT_ITEMS_CADASTRAR.id,
      expected
    );
    deepEqual(resultado, expected);
  });
});
