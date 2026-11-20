import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useTituloPagina } from '../../hooks/useTituloPagina';

const cartao = { bgcolor: 'background.paper', border: 1, borderColor: 'divider', borderRadius: '16px' };

const assuntos = ['Dúvida sobre um produto', 'Meu pedido', 'Sugestão', 'Outro assunto'];

const FORMATO_EMAIL = /^\S+@\S+\.\S+$/;

const vazio = { nome: '', email: '', assunto: assuntos[0], mensagem: '' };

function validar(campos) {
  const erros = {};
  if (!campos.nome.trim()) erros.nome = 'Informe seu nome.';
  if (!campos.email.trim()) erros.email = 'Informe seu e-mail.';
  else if (!FORMATO_EMAIL.test(campos.email)) erros.email = 'Confira o e-mail: ele precisa ter o formato nome@exemplo.com.';
  if (campos.mensagem.trim().length < 10) erros.mensagem = 'Escreva uma mensagem com pelo menos 10 caracteres.';
  return erros;
}

const Contato = () => {
  const [campos, setCampos] = useState(vazio);
  const [erros, setErros] = useState({});
  const [tocados, setTocados] = useState({});
  const [enviado, setEnviado] = useState(false);
  useTituloPagina('Contato');

  const alterar = (evento) => {
    const { name, value } = evento.target;
    const novos = { ...campos, [name]: value };
    setCampos(novos);
    if (tocados[name]) setErros(validar(novos));
  };

  const sair = (evento) => {
    const { name } = evento.target;
    setTocados((t) => ({ ...t, [name]: true }));
    setErros(validar(campos));
  };

  const enviar = (evento) => {
    evento.preventDefault();
    const encontrados = validar(campos);
    setErros(encontrados);
    setTocados({ nome: true, email: true, mensagem: true });

    const primeiro = Object.keys(encontrados)[0];
    if (primeiro) {
      document.getElementById(`contato-${primeiro}`)?.focus();
      return;
    }
    setEnviado(true);
  };

  const recomecar = () => {
    setCampos(vazio);
    setErros({});
    setTocados({});
    setEnviado(false);
  };

  const erroDe = (campo) => (tocados[campo] ? erros[campo] : undefined);

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2, pt: { xs: 4, md: 6 }, pb: 8, display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'flex-start' }}>
      <Box sx={{ flex: '1 1 340px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Typography variant="h1" sx={{ fontSize: 'clamp(34px, 4vw, 44px)', lineHeight: 1.15 }}>
          Fale com a gente
        </Typography>
        <Typography sx={{ fontSize: 18, lineHeight: '28px', color: 'text.secondary', maxWidth: '46ch' }}>
          Ficou com dúvida sobre algum produto ou sobre o seu pedido? Mande uma mensagem.
        </Typography>

        <Alert severity="info" sx={{ bgcolor: 'sage', color: 'text.primary', borderRadius: '10px', '& .MuiAlert-icon': { color: 'primary.main' } }}>
          Esta é uma loja de demonstração: o formulário funciona, mas as mensagens não são enviadas de verdade.
        </Alert>

        <Box sx={{ ...cartao, p: 3, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Typography variant="h2" sx={{ fontSize: 20, lineHeight: '28px', fontWeight: 600 }}>
            Quer falar com o desenvolvedor?
          </Typography>
          <Typography color="text.secondary">
            A loja foi criada por Gustavo Faroni. Para vagas ou conversas sobre o projeto:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
            <Button variant="outlined" startIcon={<LinkedInIcon />} href="https://www.linkedin.com/in/gustavo-faroni-bentevengo" target="_blank" rel="noopener noreferrer" sx={{ minHeight: 44, borderWidth: 1.5 }}>
              LinkedIn
            </Button>
            <Button variant="outlined" startIcon={<GitHubIcon />} href="https://github.com/GustavoFaroni" target="_blank" rel="noopener noreferrer" sx={{ minHeight: 44, borderWidth: 1.5 }}>
              GitHub
            </Button>
          </Box>
        </Box>
      </Box>

      <Box sx={{ ...cartao, flex: '1 1 420px', minWidth: 0, p: { xs: 3, md: 4 } }}>
        {enviado ? (
          <Box role="status" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 2, py: 4 }}>
            <CheckCircleOutlineIcon sx={{ fontSize: 56, color: 'primary.main' }} />
            <Typography sx={{ fontSize: 20, fontWeight: 600 }}>Mensagem recebida, {campos.nome.split(' ')[0]}!</Typography>
            <Typography color="text.secondary" sx={{ maxWidth: '40ch' }}>
              Como esta loja é uma demonstração, nada foi enviado. Obrigado por testar o formulário.
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2, alignItems: 'center' }}>
              <Button variant="contained" component={RouterLink} to="/" sx={{ minHeight: 48, px: 3 }}>
                Voltar para a loja
              </Button>
              <Link component="button" type="button" onClick={recomecar} fontWeight={600}>
                Enviar outra mensagem
              </Link>
            </Box>
          </Box>
        ) : (
          <Box component="form" noValidate onSubmit={enviar} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <Typography variant="h2" sx={{ fontSize: 22, lineHeight: '30px', fontWeight: 600 }}>
              Envie sua mensagem
            </Typography>
            <TextField
              id="contato-nome"
              name="nome"
              label="Nome"
              autoComplete="name"
              required
              value={campos.nome}
              onChange={alterar}
              onBlur={sair}
              error={Boolean(erroDe('nome'))}
              helperText={erroDe('nome') ?? ' '}
            />
            <TextField
              id="contato-email"
              name="email"
              label="E-mail"
              type="email"
              autoComplete="email"
              inputMode="email"
              slotProps={{ htmlInput: { spellCheck: false } }}
              required
              value={campos.email}
              onChange={alterar}
              onBlur={sair}
              error={Boolean(erroDe('email'))}
              helperText={erroDe('email') ?? ' '}
            />
            <TextField
              id="contato-assunto"
              name="assunto"
              label="Assunto"
              select
              value={campos.assunto}
              onChange={alterar}
              helperText=" "
            >
              {assuntos.map((a) => (
                <MenuItem key={a} value={a}>{a}</MenuItem>
              ))}
            </TextField>
            <TextField
              id="contato-mensagem"
              name="mensagem"
              label="Mensagem"
              required
              multiline
              minRows={5}
              value={campos.mensagem}
              onChange={alterar}
              onBlur={sair}
              error={Boolean(erroDe('mensagem'))}
              helperText={erroDe('mensagem') ?? `${campos.mensagem.trim().length} caracteres`}
            />
            <Button type="submit" variant="contained" size="large" sx={{ minHeight: 48, fontSize: 16 }}>
              Enviar mensagem
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Contato;
