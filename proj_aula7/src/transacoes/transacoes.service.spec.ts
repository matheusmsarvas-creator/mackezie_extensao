import { calcularMetricas } from './transacoes.service.js';

describe('calcularMetricas', () => {
  it('calcula saldo, total de despesas e gasto por impulso', () => {
    const m = calcularMetricas([
      { tipo: 'receita', valor: 3000, consumoConsciente: true },
      { tipo: 'despesa', valor: 1200.5, consumoConsciente: true },
      { tipo: 'despesa', valor: 150.25, consumoConsciente: false },
    ]);
    expect(m).toEqual({
      saldoTotal: 1649.25,
      totalDespesas: 1350.75,
      totalGastoImpulso: 150.25,
    });
  });

  it('retorna zeros sem transações', () => {
    expect(calcularMetricas([])).toEqual({
      saldoTotal: 0,
      totalDespesas: 0,
      totalGastoImpulso: 0,
    });
  });
});
