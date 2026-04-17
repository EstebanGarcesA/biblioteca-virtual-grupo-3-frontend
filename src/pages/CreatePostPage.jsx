import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { createUniqueSlug, saveCustomPost } from '../helpers/blogStorage';
import { getCurrentUser } from '../helpers/demoAuth';
import './CreatePost.css';

const initialForm = {
  title: '',
  category: 'Comunidad',
  accent: 'mint',
  excerpt: '',
  subtitle: '',
  intro: '',
  content: '',
  closing: '',
  image: '',
};

const CreatePostPage = () => {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      setForm((current) => ({
        ...current,
        image: '',
      }));
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('Selecciona un archivo de imagen valido.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setError('');
      setForm((current) => ({
        ...current,
        image: typeof reader.result === 'string' ? reader.result : '',
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const requiredFields = [
      form.title,
      form.excerpt,
      form.subtitle,
      form.intro,
      form.content,
    ];

    if (requiredFields.some((field) => !field.trim())) {
      setError('Completa titulo, resumen, subtitulo, introduccion y contenido.');
      return;
    }

    const slug = createUniqueSlug(form.title);
    const paragraphs = form.content
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);

    const post = {
      slug,
      title: form.title.trim(),
      category: form.category,
      accent: form.accent,
      excerpt: form.excerpt.trim(),
      kicker: 'Creado por el equipo',
      subtitle: form.subtitle.trim(),
      intro: form.intro.trim(),
      paragraphs,
      closing: form.closing.trim() || 'Gracias por compartir tu lectura con la comunidad.',
      image: form.image,
      authorId: currentUser.id,
      authorName: currentUser.name,
      books: [],
      isCustom: true,
    };

    saveCustomPost(post);
    navigate(`/post/${slug}`);
  };

  return (
    <main className="create-post-page">
      <Navbar />

      <section className="create-post-shell">
        <div className="create-post-intro">
          <p className="create-post-kicker">Panel de publicacion</p>
          <h1>Crear un nuevo articulo</h1>
          <p>
            Escribe un post para el blog de la biblioteca. Al publicarlo se
            guardara en este navegador y aparecera de inmediato en el listado
            principal.
          </p>
          <p className="create-post-author">Publicando como: {currentUser.name}</p>
        </div>

        <form className="create-post-form" onSubmit={handleSubmit}>
          <div className="create-post-grid">
            <label className="create-post-field">
              <span>Titulo</span>
              <input
                name="title"
                type="text"
                value={form.title}
                onChange={handleChange}
                placeholder="Ej. Clubes de lectura que deberias conocer"
              />
            </label>

            <label className="create-post-field">
              <span>Categoria</span>
              <select name="category" value={form.category} onChange={handleChange}>
                <option value="Comunidad">Comunidad</option>
                <option value="Guias">Guias</option>
                <option value="Habitos">Habitos</option>
                <option value="Estudio">Estudio</option>
                <option value="Recomendados">Recomendados</option>
                <option value="Tendencias">Tendencias</option>
              </select>
            </label>

            <label className="create-post-field">
              <span>Color de tarjeta</span>
              <select name="accent" value={form.accent} onChange={handleChange}>
                <option value="mint">Menta</option>
                <option value="coral">Coral</option>
                <option value="gold">Dorado</option>
              </select>
            </label>

            <label className="create-post-field create-post-field--full">
              <span>Imagen principal</span>
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </label>

            {form.image ? (
              <div className="create-post-image-preview">
                <img src={form.image} alt="Vista previa del articulo" />
              </div>
            ) : null}

            <label className="create-post-field create-post-field--full">
              <span>Resumen corto</span>
              <textarea
                name="excerpt"
                rows="3"
                value={form.excerpt}
                onChange={handleChange}
                placeholder="Texto breve para la tarjeta del blog"
              />
            </label>

            <label className="create-post-field create-post-field--full">
              <span>Subtitulo</span>
              <textarea
                name="subtitle"
                rows="3"
                value={form.subtitle}
                onChange={handleChange}
                placeholder="Frase que acompana el titulo dentro del articulo"
              />
            </label>

            <label className="create-post-field create-post-field--full">
              <span>Introduccion</span>
              <textarea
                name="intro"
                rows="4"
                value={form.intro}
                onChange={handleChange}
                placeholder="Primer parrafo destacado del articulo"
              />
            </label>

            <label className="create-post-field create-post-field--full">
              <span>Contenido del articulo</span>
              <textarea
                name="content"
                rows="10"
                value={form.content}
                onChange={handleChange}
                placeholder="Escribe el contenido principal. Separa parrafos con una linea en blanco."
              />
            </label>

            <label className="create-post-field create-post-field--full">
              <span>Cierre</span>
              <input
                name="closing"
                type="text"
                value={form.closing}
                onChange={handleChange}
                placeholder="Mensaje final del articulo"
              />
            </label>
          </div>

          {error ? <p className="create-post-error">{error}</p> : null}

          <div className="create-post-actions">
            <button type="submit" className="create-post-submit">
              Publicar articulo
            </button>
          </div>
        </form>
      </section>

      <Footer />
    </main>
  );
};

export default CreatePostPage;
