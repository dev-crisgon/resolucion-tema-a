// DIP
interface Repositorio {
  guardar(dato: string): void;
}

// OCP
interface MedioDePago {
  nombre: string;
  calcularTotal(monto: number): number;
}

class Efectivo implements MedioDePago {
  nombre: string = "Efectivo";

  public calcularTotal(monto: number): number {
    return monto;
  }
}

class Tarjeta implements MedioDePago {
  nombre: string = "Tarjeta";

  public calcularTotal(monto: number): number {
    return monto * 1.05;
  }
}

class BaseDeDatosMySQL implements Repositorio {
  guardar(dato: string): void {
    console.log(`[MySQL] ${dato}`);
  }
}

class Archivo implements Repositorio {
  guardar(dato: string): void {
    console.log(`[Archivo] ${dato}`);
  }
}

class SistemaCobros {
  repositorio: Repositorio;

  constructor(repositorio: Repositorio) {
    this.repositorio = repositorio;
  }

  cobrar(medio: MedioDePago, monto: number): void {
    this.repositorio.guardar(`${medio.nombre}: $${medio.calcularTotal(monto)}`);
  }
}

const sistema = new SistemaCobros(new BaseDeDatosMySQL());
const sistema2 = new SistemaCobros(new Archivo());
sistema.cobrar(new Efectivo(), 1000);
sistema.cobrar(new Tarjeta(), 2000);
sistema2.cobrar(new Efectivo(), 500);
