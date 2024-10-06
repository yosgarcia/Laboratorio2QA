import { Sucursal } from './sucursal.model';
import { mock, when, instance } from 'ts-mockito';
import { Client } from './client.model';
import { Count } from './count';


describe('Sucursal', () => {
  let cliente: Client;
  let sucursal: Sucursal;
  let cuenta: Count;
  var withdrawlAmount2000 = 200000;
  var numeroCuenta = 12345;
  var balance = 100000;

  const montoInicial = 5000;

  const saldoCuenta = 0;
  const deposito1 = 3000;
  const deposito2 = 2000;


  beforeEach(() => {
    sucursal = new Sucursal("Alajuela", "Alajuela");
    cliente = new Client("Juan", "Pérez", "25-01-76", "2401-3117", "Alajuela","jperez@gmail.com");
    sucursal.setClientes(cliente);
    cuenta = mock<Count>();
  });
   
  it('1. Saldo de cuenta', function () {
    when(cuenta.getCantidadDinero()).thenReturn(balance);
    let mockito = instance(cuenta);
    expect(mockito.getCantidadDinero()).toBe(balance);
  });
   
  it('2. Agregar nueva cuenta a cliente', function () {
    var cuenta = mock<Count>();
    let mockito = instance(cuenta);
    cliente.setCuentas(mockito);
    expect(cliente.getCuentas().length).toBe(1);
  });
  

  it('3. Retirar monto válido', function () {
    var balanceAmount3000 = 300000;
    when(cuenta.getCantidadDinero()).thenReturn(balanceAmount3000);
    when(cuenta.getNumCuenta()).thenReturn(numeroCuenta);
    when(cuenta.retirar(withdrawlAmount2000)).thenReturn(balance);
    let mockito = instance(cuenta);
    cliente.setCuentas(mockito);
    var saldo = cliente.retirar(withdrawlAmount2000, numeroCuenta);
    expect(saldo).toBe(balance);
  });
   

  it('4. Retirar más de lo permitido', function () {
    when(cuenta.getCantidadDinero()).thenReturn(balance);
    when(cuenta.getNumCuenta()).thenReturn(numeroCuenta);
    let mockito = instance(cuenta);
    cliente.setCuentas(mockito);
    expect(function() {
    cliente.retirar(withdrawlAmount2000, numeroCuenta);
    }).toThrowError(Error, "Fondos insuficientes");
  });

  it('a. Apertura de cuenta con monto inicial de 5000 colones', () => {
    when(cuenta.getCantidadDinero()).thenReturn(montoInicial);
    let mockitoCuenta = instance(cuenta);

    cliente.setCuentas(mockitoCuenta);
    let cuentaNueva = cliente.getCuentas()[0];
    expect(cuentaNueva.getCantidadDinero()).toBe(montoInicial);
  });


  it('b. Realizar dos depósitos válidos y verificar saldo final', () => {
    const nuevoSaldo = saldoCuenta + deposito1 + deposito2;
    when(cuenta.getCantidadDinero()).thenReturn(nuevoSaldo);
    let mockitoCuenta = instance(cuenta);
    cliente.setCuentas(mockitoCuenta);

    mockitoCuenta.depositar(deposito1);
    mockitoCuenta.depositar(deposito2);

    expect(mockitoCuenta.getCantidadDinero()).toBe(nuevoSaldo);

  });

  it('c. Liquidar una cuenta y verificar que el número de cuentas disminuye en 1', () => {
    const cuentaMockito1 = instance(cuenta);
    const cuentaMockito2 = instance(cuenta);
    cliente.setCuentas(cuentaMockito1);
    cliente.setCuentas(cuentaMockito2);
    const numCuentasAntesLiquidacion = cliente.getCuentas().length;
    cuentaMockito1.liquidar();
    cliente.getCuentas().pop(); 
    expect(cliente.getCuentas().length).toBe(numCuentasAntesLiquidacion -1);

  });



});
 

/*
describe('Sucursal', () => {
  it('should create an instance', () => {
    expect(new Sucursal()).toBeTruthy();
  });
});
*/