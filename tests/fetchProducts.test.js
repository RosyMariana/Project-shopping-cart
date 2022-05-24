require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  it('verifica se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('testa a função fetchProducts com o argumento "computador" e teste se fetch foi chamada', () => {
   fetchProducts('computador');
   expect(fetch).toHaveBeenCalled();
  });
  it('Testa se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', () => {
    const url = "https://api.mercadolibre.com/sites/MLB/search?q=computador";
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(url)
  })
  it('Testa se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    const resultado = await fetchProducts('computador');
    expect(resultado).toEqual(computadorSearch);
  })
  it('Testa se, ao chamar a função fetchProducts sem argumento, retorna um erro', async () => {
    expect(fetchProducts()).rejects.toEqual(new Error('You must provide an url'));
  })
   // fail('Teste vazio');
});


