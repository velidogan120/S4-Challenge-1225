export const restoran = {
  menuler: [
    {
      kategori: "Ana Yemek",
      urunler: [
        {
          id: 1,
          ad: "Adana Kebap",
          fiyat: 180,
          malzemeler: ["et", "biber", "domates"],
          kalori: 650,
        },
        {
          id: 2,
          ad: "İskender",
          fiyat: 200,
          malzemeler: ["et", "yogurt", "pide", "domates"],
          kalori: 720,
        },
        {
          id: 3,
          ad: "Tavuk Şiş",
          fiyat: 150,
          malzemeler: ["tavuk", "biber", "domates"],
          kalori: 480,
        },
      ],
    },
    {
      kategori: "İçecek",
      urunler: [
        {
          id: 4,
          ad: "Ayran",
          fiyat: 15,
          malzemeler: ["yogurt", "su"],
          kalori: 50,
        },
        { id: 5, ad: "Cola", fiyat: 25, malzemeler: [], kalori: 140 },
        { id: 6, ad: "Şalgam", fiyat: 20, malzemeler: ["şalgam"], kalori: 30 },
      ],
    },
    {
      kategori: "Tatlı",
      urunler: [
        {
          id: 7,
          ad: "Baklava",
          fiyat: 80,
          malzemeler: ["hamur", "fıstık", "şerbet"],
          kalori: 450,
        },
        {
          id: 8,
          ad: "Sütlaç",
          fiyat: 60,
          malzemeler: ["süt", "pirinç", "şeker"],
          kalori: 280,
        },
      ],
    },
  ],

  siparisler: [
    {
      masa: 5,
      garson: "Ahmet",
      saat: "12:30",
      urunler: [
        { urunId: 1, adet: 2 },
        { urunId: 4, adet: 2 },
        { urunId: 7, adet: 1 },
      ],
      durum: "hazirlaniyor",
    },
    {
      masa: 3,
      garson: "Ayşe",
      saat: "13:00",
      urunler: [
        { urunId: 2, adet: 1 },
        { urunId: 5, adet: 3 },
        { urunId: 8, adet: 2 },
      ],
      durum: "tamamlandi",
    },
    {
      masa: 7,
      garson: "Ahmet",
      saat: "13:15",
      urunler: [
        { urunId: 3, adet: 2 },
        { urunId: 6, adet: 2 },
        { urunId: 7, adet: 2 },
      ],
      durum: "hazirlaniyor",
    },
  ],

  stok: {
    et: 50,
    tavuk: 30,
    yogurt: 40,
    biber: 60,
    domates: 70,
    pide: 25,
    su: 100,
    şalgam: 20,
    hamur: 35,
    fıstık: 15,
    şerbet: 40,
    süt: 50,
    pirinç: 30,
    şeker: 45,
  },
};
