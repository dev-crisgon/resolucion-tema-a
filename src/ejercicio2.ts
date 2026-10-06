interface Pedido {
  calcularPedido(subtotal: number): number;
}

class ConfiguracionLocal {
  private static instancia: ConfiguracionLocal;
  readonly costoEnvio: number = 1500;

  private constructor() {}

  static obtenerInstancia(): ConfiguracionLocal {
    return ConfiguracionLocal.instancia
      ? ConfiguracionLocal.instancia
      : (ConfiguracionLocal.instancia = new ConfiguracionLocal());
  }
}

class PedidoRetiro implements Pedido {
  calcularPedido(subtotal: number): number {
    return subtotal;
  }
}

class PedidoEnvio implements Pedido {
  calcularPedido(subtotal: number): number {
    return subtotal + ConfiguracionLocal.obtenerInstancia().costoEnvio;
  }
}

class FabricaPedidos {
  static crear(tipo: "retiro" | "envio"): Pedido {
    switch (tipo) {
      case "retiro":
        return new PedidoRetiro();
      case "envio":
        return new PedidoEnvio();
      default:
        throw new Error("Tipo no válido!");
    }
  }
}

console.log(
  `Mismo Singleton: ${
    ConfiguracionLocal.obtenerInstancia() ===
    ConfiguracionLocal.obtenerInstancia()
  }`,
);
console.log(`Retiro: $${FabricaPedidos.crear("retiro").calcularPedido(4000)}`);
console.log(`Envio: $${FabricaPedidos.crear("envio").calcularPedido(4000)}`);
