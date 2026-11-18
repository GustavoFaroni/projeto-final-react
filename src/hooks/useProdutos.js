import { useEffect, useState } from 'react';
import { listarProdutos, buscarProduto } from '../services/produtoService';

let listaEmCache = null;
let pedidoDaLista = null;

function carregarLista() {
  if (listaEmCache) return Promise.resolve(listaEmCache);
  if (!pedidoDaLista) {
    pedidoDaLista = listarProdutos()
      .then((produtos) => {
        listaEmCache = produtos;
        return produtos;
      })
      .finally(() => {
        pedidoDaLista = null;
      });
  }
  return pedidoDaLista;
}

export function useProdutos() {
  const [produtos, setProdutos] = useState(listaEmCache ?? []);
  const [carregando, setCarregando] = useState(!listaEmCache);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    if (listaEmCache) return;
    let ativo = true;

    carregarLista()
      .then((lista) => ativo && setProdutos(lista))
      .catch((e) => ativo && setErro(e))
      .finally(() => ativo && setCarregando(false));

    return () => {
      ativo = false;
    };
  }, []);

  return { produtos, carregando, erro };
}

export function useProduto(id) {
  const doCache = listaEmCache?.find((p) => p._id === id) ?? null;
  const [produto, setProduto] = useState(doCache);
  const [carregando, setCarregando] = useState(!doCache);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const encontrado = listaEmCache?.find((p) => p._id === id);
    if (encontrado) {
      setProduto(encontrado);
      setCarregando(false);
      setErro(null);
      return;
    }

    let ativo = true;
    setCarregando(true);
    setErro(null);

    buscarProduto(id)
      .then((p) => ativo && setProduto(p))
      .catch((e) => {
        if (!ativo) return;
        setProduto(null);
        setErro(e);
      })
      .finally(() => ativo && setCarregando(false));

    return () => {
      ativo = false;
    };
  }, [id]);

  return { produto, carregando, erro };
}
