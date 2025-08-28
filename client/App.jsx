import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
  });

  const [mensagem, setMensagem] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/enviar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setMensagem(data.message || 'Enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setMensagem('Erro ao enviar');
    }
  };

  return (
    <div>
      <h1>Formulário</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={formData.nome}
          onChange={handleChange}
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Enviar</button>
      </form>

      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default App;
