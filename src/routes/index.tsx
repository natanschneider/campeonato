import { createFileRoute } from '@tanstack/react-router'
import GetClassificacao from '@/repository/GetClassificacao';
import type { Classificacao, Time } from '@/types/Classificacao';
import type { ColumnDef } from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const Route = createFileRoute('/')({
  async component() {
    const data = await GetClassificacao() as Classificacao;
    return <App data={data} />
  }
})

export const TableClassificacao: ColumnDef<Time>[] = [
  {
    accessorKey: "id",
    header: "",
    cell: (info) => {
      const rowIndex = info.row.index;
      return <span>{rowIndex + 1}</span>;
    }
  },
  {
    accessorKey: "brasao",
    header: "",
    cell: (info) => (
      <img
        src={info.getValue() as string}
        alt="Brasão"
        className="w-10 h-10"
      />
    )
  },
  {
    accessorKey: "nome",
    header: "Equipe"
  },
  {
    accessorKey: "Pts",
    header: "Pts"
  },
  {
    accessorKey: "PJ",
    header: "PJ"
  },
  {
    accessorKey: "VIT",
    header: "VIT"
  },
  {
    accessorKey: "E",
    header: "E"
  },
  {
    accessorKey: "DER",
    header: "DER"
  },
  {
    accessorKey: "GP",
    header: "GP"
  },
  {
    accessorKey: "GC",
    header: "GC"
  },
  {
    accessorKey: "SG",
    header: "SG"
  },
  {
    accessorKey: "Jogos",
    header: "Ultimas cinco",
    cell: (info) => {
      const jogos = info.getValue() as string[];
      const getColor = (resultado: string) => {
        switch (resultado) {
          case 'V':
            return 'bg-green-500';
          case 'D':
            return 'bg-red-500';
          case 'E':
            return 'bg-gray-500';
          default:
            return 'bg-gray-300';
        }
      };

      return (
        <div className="flex gap-1">
          {jogos.map((jogo, index) => (
            <div
              key={index}
              className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${getColor(jogo)}`}
            >
              {jogo}
            </div>
          ))}
        </div>
      );
    }
  }
];

function App({ data }: { data: Classificacao }) {
  const table = useReactTable({
    data,
    columns: TableClassificacao,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={TableClassificacao.length}
                  className="h-24 text-center"
                >
                  Nenhum resultado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </main>
  )
}