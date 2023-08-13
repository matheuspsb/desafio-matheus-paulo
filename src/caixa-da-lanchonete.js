class CaixaDaLanchonete {
  cardapio = {
    cafe: {
      descricao: "Café",
      valor: 3.0,
    },
    chantily: {
      descricao: "Chantily (extra do Café)",
      valor: 1.5,
    },
    suco: {
      descricao: "Suco Natural",
      valor: 6.2,
    },
    sanduiche: {
      descricao: "Sanduíche",
      valor: 6.5,
    },
    queijo: {
      descricao: "Queijo (extra do Sanduíche)",
      valor: 2.0,
    },
    salgado: {
      descricao: "Salgado",
      valor: 7.25,
    },
    combo1: {
      descricao: "1 Suco e 1 Sanduíche",
      valor: 9.5,
    },
    combo2: {
      descricao: "1 Café e 1 Sanduíche",
      valor: 7.5,
    },
  };

  calcularValorDaCompra(metodoDePagamento, itens) {
    if (!["debito", "credito", "dinheiro"].includes(metodoDePagamento)) {
      return "Forma de pagamento inválida!";
    }

    const pedido = [];
    let valorTotal = 0;
    let temPrincipal = false;

    for (const item of itens) {
      const [codigo, quantidade] = item.split(",");

      if (!this.cardapio[codigo]) {
        return "Item inválido!";
      }

      const itemInfo = this.cardapio[codigo];
      valorTotal += itemInfo.valor * quantidade;

      if (codigo === "chantily" || codigo === "queijo") {
        if (!temPrincipal) {
          return "Item extra não pode ser pedido sem o principal";
        }
      } else {
        temPrincipal = true;
      }

      pedido.push({ codigo, quantidade });
    }

    for (const extra of pedido) {
        if (extra.codigo === 'chantily' && !pedido.some(item => item.codigo === 'cafe')) {
          return 'Item extra não pode ser pedido sem o principal';
        }
      
        if (extra.codigo === 'queijo' && !pedido.some(item => item.codigo === 'sanduiche')) {
          return 'Item extra não pode ser pedido sem o principal';
        }
    }

    if (!temPrincipal) {
      return "Não há itens no carrinho de compra!";
    }

    if (valorTotal <= 0) {
      return "Quantidade inválida!";
    }

    if (metodoDePagamento === "dinheiro") {
      valorTotal *= 0.95;
    } else if (metodoDePagamento === "credito") {
      valorTotal *= 1.03;
    }

    return `R$ ${valorTotal.toFixed(2)}`.replace(".", ",");
  }
}

export { CaixaDaLanchonete };
