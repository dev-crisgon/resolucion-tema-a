abstract class Vehiculo {
  readonly patente: string;

  constructor(patente: string) {
    this.patente = patente;
  }

  abstract calcularTarifa(horas: number): number;
}

class Auto extends Vehiculo {
  calcularTarifa(horas: number): number {
    return horas * 1000;
  }
}

class Moto extends Vehiculo {
  calcularTarifa(horas: number): number {
    return horas * 500;
  }
}

class Estacionamiento {
  private vehiculos: Vehiculo[] = [];
  static totalVehiculos: number = 0;

  public ingresar(vehiculo: Vehiculo): void {
    this.vehiculos.push(vehiculo);
    Estacionamiento.totalVehiculos++;
  }

  get cantidad(): string {
    return `
Vehículos estacionados: ${this.vehiculos.length}
Total histórico de ingresos: ${Estacionamiento.totalVehiculos}`;
  }

  public mostrarTarifas(horas: number): void {
    for (const vehiculo of this.vehiculos) {
      console.log(
        `${vehiculo.patente} paga $${vehiculo.calcularTarifa(horas)}`,
      );
    }
  }
}

const estacionamiento = new Estacionamiento();
estacionamiento.ingresar(new Auto("AB123CD"));
estacionamiento.ingresar(new Moto("XY987ZW"));

estacionamiento.mostrarTarifas(2);

console.log(estacionamiento.cantidad);
