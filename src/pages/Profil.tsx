import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useSchool } from "@/contexts/SchoolContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { tr } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, GraduationCap } from "lucide-react";
import FilterSidebar from "@/components/FilterSidebar";
import PaginationBar, { PerPage, paginate } from "@/components/PaginationBar";
import { LinkedText } from "@/lib/linkify";

const VALID_TABS = ["sejarah", "visimisi", "pegawai", "siswa"];

export default function Profil() {
  const { data } = useSchool();
  const { t, lang } = useLanguage();
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const initialTab = tabParam && VALID_TABS.includes(tabParam) ? tabParam : "sejarah";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [selectedPegawai, setSelectedPegawai] = useState<any>(null);

  // Pegawai filter
  const [pSearch, setPSearch] = useState("");
  const [pFilterJabatan, setPFilterJabatan] = useState("all");
  const [pPerPage, setPPerPage] = useState<PerPage>(30);
  const [pPage, setPPage] = useState(1);

  // Siswa filter
  const [sSearch, setSSearch] = useState("");
  const [sPerPage, setSPerPage] = useState<PerPage>(20);
  const [sPage, setSPage] = useState(1);

  useEffect(() => {
    if (tabParam && VALID_TABS.includes(tabParam)) setActiveTab(tabParam);
  }, [tabParam]);

  const jabatanOptions = useMemo(() => [...new Set(data.pegawai.map((p) => p.jabatan))], [data.pegawai]);

  const pegawaiFiltered = useMemo(
    () =>
      data.pegawai.filter((p) => {
        const ms = p.nama.toLowerCase().includes(pSearch.toLowerCase());
        const mf = pFilterJabatan === "all" || p.jabatan === pFilterJabatan;
        return ms && mf;
      }),
    [data.pegawai, pSearch, pFilterJabatan],
  );
  const pegawaiPaged = paginate(pegawaiFiltered, pPage, pPerPage);

  const siswaFiltered = useMemo(
    () => data.siswa.filter((s) => s.kelas.toLowerCase().includes(sSearch.toLowerCase())),
    [data.siswa, sSearch],
  );
  const siswaPaged = paginate(siswaFiltered, sPage, sPerPage);
  const totalSiswa = data.siswa.reduce((sum, s) => sum + (Number(s.jumlah) || 0), 0);

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-foreground">{t("page_profil")}</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
            <TabsTrigger value="sejarah" className="text-xs sm:text-sm py-2">{t("tab_sejarah")}</TabsTrigger>
            <TabsTrigger value="visimisi" className="text-xs sm:text-sm py-2">{t("tab_visimisi")}</TabsTrigger>
            <TabsTrigger value="pegawai" className="text-xs sm:text-sm py-2">{t("tab_pegawai")}</TabsTrigger>
            <TabsTrigger value="siswa" className="text-xs sm:text-sm py-2">{t("tab_siswa")}</TabsTrigger>
          </TabsList>

          <TabsContent value="sejarah" className="mt-6">
            <img src={data.profil.fotoSekolah} alt="Sekolah" className="w-full h-48 sm:h-64 object-cover rounded-lg mb-6" />
            <div className="text-muted-foreground leading-relaxed">
              <LinkedText text={tr(data.profil.sejarah, lang)} />
            </div>
          </TabsContent>

          <TabsContent value="visimisi" className="mt-6 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg text-foreground mb-2">{t("profil_visi")}</h3>
                <div className="text-muted-foreground">
                  <LinkedText text={tr(data.profil.visi, lang)} />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg text-foreground mb-2">{t("profil_misi")}</h3>
                <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                  {data.profil.misi.map((m, i) => (
                    <li key={i}>
                      <LinkedText text={tr(m, lang)} />
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg text-foreground mb-2">{t("profil_tujuan")}</h3>
                <div className="text-muted-foreground">
                  <LinkedText text={tr(data.profil.tujuan, lang)} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pegawai" className="mt-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <FilterSidebar>
                <div>
                  <Label className="text-xs text-muted-foreground">{t("cari")}</Label>
                  <div className="relative mt-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder={t("search_nama")}
                      value={pSearch}
                      onChange={(e) => {
                        setPSearch(e.target.value);
                        setPPage(1);
                      }}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">{t("filter_jabatan")}</Label>
                  <Select
                    value={pFilterJabatan}
                    onValueChange={(v) => {
                      setPFilterJabatan(v);
                      setPPage(1);
                    }}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("filter_semua_jabatan")}</SelectItem>
                      {jabatanOptions.map((j) => (
                        <SelectItem key={j} value={j}>
                          {j}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </FilterSidebar>

              <div className="flex-1 min-w-0">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                  {pegawaiPaged.map((p) => (
                    <Card
                      key={p.id}
                      className="text-center hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
                      onClick={() => setSelectedPegawai(p)}
                    >
                      <div className="aspect-[3/4] w-full overflow-hidden">
                        <img src={p.foto} alt={p.nama} className="w-full h-full object-cover" />
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-foreground">{p.nama}</h4>
                        <p className="text-sm text-muted-foreground">{p.jabatan}</p>
                      </CardContent>
                    </Card>
                  ))}
                  {pegawaiPaged.length === 0 && (
                    <p className="col-span-full text-center text-muted-foreground py-8">{t("no_data")}</p>
                  )}
                </div>
                <PaginationBar
                  total={pegawaiFiltered.length}
                  page={pPage}
                  perPage={pPerPage}
                  onPageChange={setPPage}
                  onPerPageChange={(pp) => {
                    setPPerPage(pp);
                    setPPage(1);
                  }}
                  options={[10, 20, 30, "all"]}
                />
              </div>
            </div>

            <Dialog open={!!selectedPegawai} onOpenChange={(open) => !open && setSelectedPegawai(null)}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-center">{selectedPegawai?.nama}</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-full aspect-[3/4] overflow-hidden rounded-lg">
                    <img
                      src={selectedPegawai?.foto}
                      alt={selectedPegawai?.nama}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-muted-foreground">{selectedPegawai?.jabatan}</p>
                </div>
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="siswa" className="mt-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <FilterSidebar>
                <div>
                  <Label className="text-xs text-muted-foreground">{t("cari")}</Label>
                  <div className="relative mt-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder={t("search_kelas")}
                      value={sSearch}
                      onChange={(e) => {
                        setSSearch(e.target.value);
                        setSPage(1);
                      }}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="rounded-lg bg-primary/5 p-3 border border-primary/20">
                  <p className="text-xs text-muted-foreground">{t("total_siswa")}</p>
                  <p className="text-2xl font-bold text-primary flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" /> {totalSiswa}
                  </p>
                </div>
              </FilterSidebar>

              <div className="flex-1 min-w-0">
                <div className="rounded-lg border bg-background overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-center px-4 py-3 font-semibold text-sm">{t("kelas")}</th>
                        <th className="text-center px-4 py-3 font-semibold text-sm">{t("jumlah_siswa")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {siswaPaged.map((s) => (
                        <tr key={s.id} className="border-t">
                          <td className="px-4 py-3 text-center">{s.kelas}</td>
                          <td className="px-4 py-3 text-center">{s.jumlah}</td>
                        </tr>
                      ))}
                      {siswaPaged.length === 0 && (
                        <tr>
                          <td colSpan={2} className="text-center text-muted-foreground py-6">
                            {t("no_data")}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <PaginationBar
                  total={siswaFiltered.length}
                  page={sPage}
                  perPage={sPerPage}
                  onPageChange={setSPage}
                  onPerPageChange={(pp) => {
                    setSPerPage(pp);
                    setSPage(1);
                  }}
                  options={[10, 20, 30, "all"]}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
