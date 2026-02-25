import React, { useState } from 'react';
import './App.css';

const Logo = () => (
  <svg width="80" height="80" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="logo-svg">
    <path d="M160 100C160 133.137 133.137 160 100 160C66.8629 160 40 133.137 40 100C40 66.8629 66.8629 40 100 40C110 40 119.5 42.5 127.5 47C115 55 107 69 107 85C107 110.405 127.595 131 153 131C158 131 163 130 167.5 128C163 146.5 146.5 160 127.5 160C100 160 77.5 137.5 77.5 110C77.5 82.5 100 60 127.5 60C132.5 60 137.5 61 142 62.5C135 52 124 45 111.5 42.5C150 45 180 77.5 180 117.5C180 157.5 147.5 190 107.5 190C67.5 190 35 157.5 35 117.5C35 77.5 67.5 45 107.5 45" fill="#C5A059"/>
    <path d="M100 70V85M90 90H110L107 115H93L90 90ZM95 120H105M100 115V120" stroke="#C5A059" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

const MENU = {
  comidas: [
    { id: 1, nome: "Kibe de Cordeiro", preco: 48.0, desc: "Kibe artesanal recheado com carne de cordeiro e nozes.", img: "https://images.unsplash.com/photo-1606491956391-70868b5d0f47?w=600" },
    { id: 2, nome: "Esfiha Real", preco: 18.0, desc: "Massa folhada leve com blend de queijos árabes.", img: "https://images.unsplash.com/photo-1593560704563-f175a22bb1af?w=600" },
    { id: 3, nome: "Hummus Premium", preco: 52.0, desc: "Pasta de grão-de-bico orgânico e azeite extra virgem.", img: "https://images.unsplash.com/photo-1577906030526-f9d4923067e7?w=600" },
    { id: 4, nome: "Falafel do Chef", preco: 45.0, desc: "Bolinhos crocantes servidos com molho Tarator.", img: "https://images.unsplash.com/photo-1593001874117-c99c800e3eb7?w=600" },
    { id: 6, nome: "Shawarma Filé", preco: 65.0, desc: "Tiras de filé mignon marinadas em especiarias sírias.", img: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600" },
  ],
  bebidas: [
    { id: 8, nome: "Arak Especial", preco: 35.0, desc: "Destilado premium de uva com anis e gelo cristalino.", img: "https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?w=600" },
    { id: 9, nome: "Chá Marrakesh", preco: 12.0, desc: "Chá verde com hortelã fresca e mel silvestre.", img: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600" },
    { id: 11, nome: "Ayran Cremoso", preco: 18.0, desc: "Iogurte artesanal batido com sal marinho.", img: "https://images.unsplash.com/photo-1528498033373-3c6c08e93d79?w=600" },
  ]
};

export default function App() {
  const [abaAtiva, setAbaAtiva] = useState('comidas');
  const [carrinho, setCarrinho] = useState([]);
  const [pagamento, setPagamento] = useState('pix');
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');

  const adicionarAoCarrinho = (item) => {
    setCarrinho(prev => {
      const existe = prev.find(i => i.id === item.id);
      if (existe) return prev.map(i => i.id === item.id ? { ...i, qtd: i.qtd + 1 } : i);
      return [...prev, { ...item, qtd: 1 }];
    });
  };

  const alterarQtd = (id, delta) => {
    setCarrinho(prev => prev.map(i => i.id === id ? { ...i, qtd: Math.max(0, i.qtd + delta) } : i).filter(i => i.qtd > 0));
  };

  const total = carrinho.reduce((acc, i) => acc + (i.preco * i.qtd), 0);

  const finalizarPedido = () => {
    if (!nome || !endereco) {
      alert("Por favor, preencha o seu nome e endereço de entrega!");
      return;
    }
    const numero = "5511999999999"; // COLOQUE SEU NÚMERO AQUI
    const itensTexto = carrinho.map(i => `• *${i.qtd}x* ${i.nome}`).join('\n');
    const msg = encodeURIComponent(
      `*NOVO PEDIDO - AL-SULTAN*\n\n` +
      `*Cliente:* ${nome}\n` +
      `*Endereço:* ${endereco}\n` +
      `---------------------------\n` +
      `*Itens:*\n${itensTexto}\n\n` +
      `*Total:* R$ ${total.toFixed(2).replace('.', ',')}\n` +
      `*Pagamento:* ${pagamento.toUpperCase()}`
    );
    window.open(`https://wa.me/${numero}?text=${msg}`, '_blank');
  };

  return (
    <div className="site-wrapper">
      <header className="hero-full">
        <div className="hero-content">
          <Logo />
          <h1>AL-SULTAN</h1>
          <p>Experiência Árabe Premium</p>
        </div>
      </header>

      <div className="app-container">
        <nav className="tab-navigation">
          <button className={abaAtiva === 'comidas' ? 'active' : ''} onClick={() => setAbaAtiva('comidas')}>Comidas</button>
          <button className={abaAtiva === 'bebidas' ? 'active' : ''} onClick={() => setAbaAtiva('bebidas')}>Bebidas</button>
        </nav>

        <div className="main-layout">
          <main className="menu-grid">
            {MENU[abaAtiva].map(item => (
              <div key={item.id} className="menu-card">
                <div className="img-box"><img src={item.img} alt={item.nome} /></div>
                <div className="card-info">
                  <h3>{item.nome}</h3>
                  <p className="description">{item.desc}</p>
                  <div className="card-footer">
                    <span className="price">R$ {item.preco.toFixed(2).replace('.', ',')}</span>
                    <button onClick={() => adicionarAoCarrinho(item)}>Adicionar</button>
                  </div>
                </div>
              </div>
            ))}
          </main>

          <aside className="checkout-sidebar">
            <h2>Seu Pedido</h2>
            {carrinho.length === 0 ? <p className="empty-msg">Seu carrinho está vazio.</p> : (
              <div className="cart-list">
                {carrinho.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="item-details">
                      <p>{item.nome}</p>
                      <small>{item.qtd}x - R$ {(item.preco * item.qtd).toFixed(2)}</small>
                    </div>
                    <div className="quantity-controls">
                      <button onClick={() => alterarQtd(item.id, -1)}>-</button>
                      <span>{item.qtd}</span>
                      <button onClick={() => alterarQtd(item.id, 1)}>+</button>
                    </div>
                  </div>
                ))}
                
                <div className="cart-total">
                  <span>Total</span>
                  <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>

                <div className="customer-data">
                  <label>Seu Nome</label>
                  <input type="text" placeholder="Como te chamamos?" value={nome} onChange={(e) => setNome(e.target.value)} />
                  <label>Endereço</label>
                  <textarea placeholder="Rua, número, bairro..." value={endereco} onChange={(e) => setEndereco(e.target.value)} />
                  <label>Pagamento</label>
                  <select value={pagamento} onChange={(e) => setPagamento(e.target.value)}>
                    <option value="pix">PIX</option>
                    <option value="cartao">Cartão</option>
                    <option value="dinheiro">Dinheiro</option>
                  </select>
                </div>

                <button className="finish-btn" onClick={finalizarPedido}>Enviar Pedido no WhatsApp</button>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}