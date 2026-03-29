# 🌿 NutriNaila - Site Institucional

Site moderno, otimizado e pronto para produção para a nutricionista Naila Gomes.

## 📁 Estrutura de Arquivos

```
NutriNaila/
├── index.html              # Página principal
├── robots.txt              # Configuração para motores de busca
├── sitemap.xml             # Sitemap para SEO
├── site.webmanifest        # PWA Manifest
├── assets/
│   ├── css/
│   │   ├── style.css       # CSS principal
│   │   └── blog.css        # CSS específico para páginas do blog
│   ├── js/
│   │   └── script.js       # JavaScript principal
│   └── images/             # Imagens do site (a adicionar)
└── blog/
    ├── colageno-beneficios.html
    ├── alimentacao-intuitiva.html (a criar)
    └── dieta-anti-inflamatoria.html (a criar)
```

## 🚀 Deploy - HostGator

### Passo a Passo:

1. **Acesso ao cPanel**
   - Acesse https://seuhospedagem.com/cpanel
   - Faça login com suas credenciais

2. **Gerenciador de Arquivos**
   - Abra o "Gerenciador de Arquivos"
   - Navegue até `public_html/`

3. **Upload dos Arquivos**
   - Faça upload de TODOS os arquivos e pastas
   - Mantenha a mesma estrutura de diretórios
   - Certifique-se que `index.html` esteja na raiz

4. **Configurar SSL**
   - No cPanel, vá em "SSL/TLS"
   - Ative o SSL gratuito (Let's Encrypt)
   - Force HTTPS nas configurações

5. **Configurar Redirecionamento WWW**
   - No cPanel, vá em "Domínios"
   - Configure redirecionamento para www ou não-www

## 🚀 Deploy - Servidor Estático (Netlify/Vercel)

### Netlify:

```bash
# Instale o Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

### Vercel:

```bash
# Instale o Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

## ⚙️ Configurações Necessárias

### 1. Google Analytics 4

Edite `index.html` e substitua:
```html
gtag('config', 'G-XXXXXXXXXX', {
```
Pelo seu ID de medição real do GA4.

### 2. Meta Pixel

Edite `index.html` e substitua:
```javascript
fbq('init', 'XXXXXXXXXXXXXXX');
```
Pelo seu Pixel ID do Facebook.

### 3. Número do WhatsApp

O WhatsApp já está configurado como **(41) 3222-0108**. Se precisar alterar, edite todos os arquivos HTML e substitua:
```
554132220108
```

### 4. Email

O email já está configurado como **nutri.nailagomes@gmail.com**.

### 5. Imagens

As seguintes imagens já estão disponíveis em `assets/images/`:

| Arquivo | Status | Descrição |
|---------|--------|-----------|
| `017.jpeg` | ✅ Incluída | Foto principal da hero (mulher de blazer verde) |
| `sobre-nutricionista.webp` | ✅ Incluída | Foto sentada na cadeira (seção sobre) |
| `Logotipo vertical - sem fundo (2)(1).png` | ✅ Incluída | Logo oficial |

**Imagens para criar (opcional):**
| Arquivo | Dimensões | Descrição |
|---------|-----------|-----------|
| `favicon-32x32.png` | 32x32px | Favicon |
| `favicon-16x16.png` | 16x16px | Favicon |
| `apple-touch-icon.png` | 180x180px | Icon Apple |
| `og-image.jpg` | 1200x630px | Open Graph image |
| `twitter-image.jpg` | 1200x630px | Twitter Card image |

Para ícones PWA, crie pasta `assets/images/icons/` com:
- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png

### 5. Mapa do Google

Edite o iframe em `index.html` na seção de contato:
- Obtenha o embed code correto no Google Maps
- Substitua o src do iframe

## ✅ Checklist de Validação

### SEO Técnico
- [ ] Meta title único em cada página
- [ ] Meta description preenchida
- [ ] Open Graph tags configuradas
- [ ] Twitter Card configurado
- [ ] Schema.org implementado
- [ ] Sitemap.xml acessível
- [ ] Robots.txt configurado
- [ ] Canonical URL definida

### Performance
- [ ] Imagens otimizadas (WebP)
- [ ] Lazy loading implementado
- [ ] CSS minificado (opcional)
- [ ] JavaScript defer/async
- [ ] Preconnect para fonts.googleapis

### Acessibilidade
- [ ] Skip link implementado
- [ ] Alt text em todas imagens
- [ ] Aria-labels em botões
- [ ] Contraste de cores adequado
- [ ] Navegação por teclado funcional

### Analytics
- [ ] Google Analytics 4 instalado
- [ ] Meta Pixel instalado
- [ ] Eventos de conversão configurados
- [ ] Testar eventos no DebugView

## 🧪 Testes Recomendados

### Google PageSpeed Insights
https://pagespeed.web.dev/

### Google Mobile-Friendly Test
https://search.google.com/test/mobile-friendly

### Rich Results Test (Schema.org)
https://search.google.com/test/rich-results

### W3C Validator
https://validator.w3.org/

## 📊 Métricas de Performance Esperadas

| Métrica | Meta |
|---------|------|
| LCP (Largest Contentful Paint) | < 2.5s |
| FID (First Input Delay) | < 100ms |
| CLS (Cumulative Layout Shift) | < 0.1 |
| Performance Score | > 90 |

## 🔧 Manutenção

### Adicionar Novo Post no Blog

1. Copie o template de `blog/colageno-beneficios.html`
2. Edite o conteúdo do artigo
3. Atualize meta tags (title, description, og:image)
4. Adicione ao sitemap.xml
5. Atualize links de navegação entre posts

### Atualizar Ano do Copyright

O ano é atualizado automaticamente via JavaScript.

## 📞 Suporte

Para dúvidas ou problemas, consulte a documentação ou entre em contato com a equipe de desenvolvimento.

---

**Desenvolvido com ❤️ para NutriNaila**
