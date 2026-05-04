// ... (SEMUA IMPORT & CODE ATAS TETAP SAMA)

<TableBody>
  {filtered.map(k => {
    const cardImg = k.tipe === 'video'
      ? (k.thumbnail || getVideoThumbnail(k.videoUrl))
      : k.fotoUtama;

    return (
      <TableRow key={k.id}>
        <TableCell>
          {cardImg
            ? <img src={cardImg} className="w-10 h-10 object-cover rounded" />
            : <div className="w-10 h-10 bg-muted rounded" />}
        </TableCell>

        <TableCell>{tr(k.judul, 'id')}</TableCell>

        {/* 🔥 INI YANG DIUBAH */}
        <TableCell>
          <span
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium
            ${
              k.tipe === 'foto'
                ? 'bg-blue-100 text-blue-600'
                : 'bg-red-100 text-red-600'
            }`}
          >
            {k.tipe === 'foto' ? (
              <>
                <ImageIcon className="w-3 h-3" />
                Foto
              </>
            ) : (
              <>
                <Video className="w-3 h-3" />
                Video
              </>
            )}
          </span>
        </TableCell>

        <TableCell>{k.tanggal}</TableCell>

        <TableCell className="text-right space-x-2">
          <Button size="sm" onClick={() => openEdit(k)}>
            <Pencil className="w-3 h-3" />
          </Button>
          <Button size="sm" variant="destructive" onClick={() => handleDelete(k.id)}>
            <Trash2 className="w-3 h-3" />
          </Button>
        </TableCell>
      </TableRow>
    );
  })}
</TableBody>
