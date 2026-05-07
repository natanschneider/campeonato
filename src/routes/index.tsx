import { createFileRoute } from '@tanstack/react-router'
import GetClassificacao from '@/repository/GetClassificacao';
import type { Classificacao } from '#/types/Classificacao';

export const Route = createFileRoute('/')({
  async component() {
    const data = await GetClassificacao() as Classificacao;
    return <App data={data} />
  }
})

function App({ data }: { data: Classificacao }) {
  console.log(data);
  return (
    <main className="page-wrap px-4 pb-8 pt-14">
    </main>
  )
}