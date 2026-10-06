class BaseDeDatosMySQL {
  guardar(dato: string): void {
    console.log(`[MySQL] ${dato}`);
  }
}

class SistemaCobros {
  cobrar(medio: string, monto: number): void {
    let total = monto;
    if (medio === "tarjeta") {
      total = monto * 1.05;
    }
    const db = new BaseDeDatosMySQL();
    db.guardar(`${medio}: $${total}`);
  }
}

const sistema = new SistemaCobros();
sistema.cobrar("efectivo", 1000);
sistema.cobrar("tarjeta", 2000);
