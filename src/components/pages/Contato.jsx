import React, { useState } from 'react';

const Contato = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({ name: '', email: '' });

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Nome é obrigatório';
    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert('Formulário enviado!');
    }
  };

  return (
  <form onSubmit={handleSubmit}>
      <div>
        <label>
          Nome:
        </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }/>
              {errors.name && <span>{errors.name}</span>}
          </div>
        <div>
          <label>
          Email:
          </label>     
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }/>
        {errors.email && <span>{errors.email}</span>}
        </div>
       <button type="submit">Enviar</button>
    </form>
  );
}

export default Contato;
