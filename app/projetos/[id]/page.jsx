// app/projetos/[id]/page.jsx
import DetalhesProjeto from "./_components/detalhesProjeto";

export default async function ProjetoDetalhe({ params }) {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_DOMINIO}/projetos/${id}`,
    { next: { revalidate: 0 } }
  );

  const projeto = await res.json();

  return (
    <DetalhesProjeto projeto={projeto} />
  );
}
