import { restoran } from "./data.js";
/**
 SORU 1: Menüde Arama Sistemi
Görev: Menüdeki ürünleri farklı kriterlere göre arayabilen bir higher-order function yaz.
İstenenler:

- menudeAra adında bir higher-order function oluştur
- Callback ile dinamik arama kriterleri belirlenebilsin
- Bulunan ürünlerin kategori bilgisi de dahil edilsin

// 50 TL ve altı ürünler
// 500 kalorinin altındaki ürünler  
// "domates" malzemesi içeren ürünler
 */

function menudeAra(menu, kriterCallback) {
  return menu.map((menuItem) => {
    return {
      urunler: menuItem.urunler.filter((urun) => kriterCallback(urun)),
      kategori: menuItem.kategori,
    };
  });
}
const fiyat50veAlti = menudeAra(restoran.menuler, (urun) => urun.fiyat <= 50);
// console.log("Fiyatı 50 TL ve altı ürünler:", fiyat50veAlti);
/**
 SORU 2: Sipariş İşleme Sistemi
Görev: Siparişleri detaylı şekilde işleyen bir sistem oluştur.
İstenenler:

- siparisiIsle higher-order function'ı yaz
- Her sipariş ürününü menüde bulup detaylarını getir
- Callback ile sipariş detayını özelleştirilebilir yap
- Sipariş toplam tutarını hesapla

 */
function siparisiIsle(siparisler, detayCallback) {
  const detayMenu = restoran.menuler.flatMap((menuItem) => menuItem.urunler);
  const detayliSiparisler = siparisler.map((siparis) =>
    // return {
    //   ...siparis,
    //   urunler: siparis.urunler.map((siparisUrun) => {
    //     return {
    //       ...detayMenu.find((detayUrun) => detayUrun.id === siparisUrun.urunId),
    //       adet: siparisUrun.adet,
    //       fiyat:
    //         detayMenu.find((detayUrun) => detayUrun.id === siparisUrun.urunId)
    //           .fiyat * siparisUrun.adet,
    //     };
    //   }),
    // };
    detayCallback(siparis),
  );
  const siparisleriToplamlari = siparisler.map((siparis) => {
    return {
      ...siparis.urunler.map((urun) => {
        const urunDetay = detayMenu.find(
          (detayUrun) => detayUrun.id === urun.urunId,
        );
        return {
          urunId: urunDetay.id,
          adet: urun.adet,
          fiyat: urunDetay.fiyat * urun.adet,
        };
      }),
      toplamTutar: siparis.urunler.reduce((toplam, urun) => {
        const urunDetay = detayMenu.find(
          (detayUrun) => detayUrun.id === urun.urunId,
        );
        return toplam + urunDetay.fiyat * urun.adet;
      }, 0),
      masa: siparis.masa,
    };
  });

  return siparisleriToplamlari;
}
// console.log(
//   "Sipariş Detayları:",
//   siparisiIsle(restoran.siparisler, (siparis) => {
//     const detayMenu = restoran.menuler.flatMap((menuItem) => menuItem.urunler);
//     return {
//       ...siparis,
//       urunler: siparis.urunler.map((siparisUrun) => {
//         const urunDetay = detayMenu.find(
//           (urun) => urun.id === siparisUrun.urunId,
//         );

//         return {
//           ...urunDetay,
//           adet: siparisUrun.adet,
//           toplamFiyat: urunDetay.fiyat * siparisUrun.adet,
//         };
//       }),
//     };
//   }),
// );
/**
 SORU 3: Malzeme Envanter Sistemi
Görev: Siparişlerin malzeme tüketimini hesaplayan ve stok kontrolü yapan bir sistem yaz.
İstenenler:

- Sipariş detaylarından kullanılan malzemeleri topla
- Stok durumunu kontrol et
- Stok uyarıları ver (critical: %20'nin altı, low: %50'nin altı)
 */
function malzemeEnvanter(siparisler, stok) {
  const detayMenu = restoran.menuler.flatMap((menuItem) => menuItem.urunler);
  const malzemeEnvanter = {};
  const stokDurumu = {};
  siparisler.map((siparis) =>
    siparis.urunler.map((siparisUrun) => {
      const urunDetay = detayMenu.find(
        (urunDetay) => urunDetay.id === siparisUrun.urunId,
      );
      urunDetay.malzemeler.map((malzeme) =>
        malzemeEnvanter.hasOwnProperty(malzeme)
          ? (malzemeEnvanter[malzeme] += siparisUrun.adet)
          : (malzemeEnvanter[malzeme] = siparisUrun.adet),
      );
    }),
  );
  Object.keys(malzemeEnvanter).map((malzeme) => {
    if (stok.hasOwnProperty(malzeme)) {
      const kullanilanMiktar = malzemeEnvanter[malzeme];
      const mevcutStok = stok[malzeme];
      const kalanStok = mevcutStok - kullanilanMiktar;
      const stokYuzdesi = Math.trunc((kalanStok / mevcutStok) * 100);
      if (stokYuzdesi < 20) {
        stokDurumu[malzeme] = "critical: %20'nin altı";
      } else if (stokYuzdesi < 50) {
        stokDurumu[malzeme] = "low: %50'nin altı";
      } else {
        stokDurumu[malzeme] = "sufficient";
      }
    } else {
      stokDurumu[malzeme] = "out of stock";
    }
  });
  return stokDurumu;
}

// console.log(
//   "Malzeme Envanter Durumu:",
//   malzemeEnvanter(restoran.siparisler, restoran.stok),
// );

/**
 SORU 4: Garson Performans Raporu
Görev: Garsonların performansını analiz eden bir sistem oluştur.
İstenenler:

- Her garsonun toplam satışını hesapla
- Kaç sipariş aldığını bul
- Ortalama sipariş tutarını hesapla
- En çok satan garson ve en düşük satan garson bilgisini göster
 */
function garsonPerformansRaporu(siparisler) {
  const detayMenu = restoran.menuler.flatMap((menuItem) => menuItem.urunler);
  const garsonRaporu = {};
  siparisler.map((siparis) => {
    if (garsonRaporu.hasOwnProperty(siparis.garson)) {
      garsonRaporu[siparis.garson].siparisSayisi += 1;
      garsonRaporu[siparis.garson].toplamSatis += siparis.urunler
        .map(
          (urun) =>
            detayMenu.find((detayUrun) => detayUrun.id === urun.urunId).fiyat *
            urun.adet,
        )
        .reduce((toplam, fiyat) => toplam + fiyat, 0);
    } else {
      garsonRaporu[siparis.garson] = {
        siparisSayisi: 1,
        toplamSatis: siparis.urunler
          .map(
            (urun) =>
              detayMenu.find((detayUrun) => detayUrun.id === urun.urunId)
                .fiyat * urun.adet,
          )
          .reduce((toplam, fiyat) => toplam + fiyat, 0),
      };
    }
  });
  Object.keys(garsonRaporu).map((garson) => {
    garsonRaporu[garson].ortalamaSiparisTutar =
      garsonRaporu[garson].toplamSatis / garsonRaporu[garson].siparisSayisi;
  });
  return garsonRaporu;
}
// console.log(
//   "Garson Performans Raporu:",
//   garsonPerformansRaporu(restoran.siparisler),
// );
/*
SORU 5: Kategori Bazlı Satış Analizi
Görev: Hangi kategorilerin ne kadar satış yaptığını analiz et.
İstenenler:

- Her kategoriden kaç ürün satıldığını bul
- Kategori bazlı ciro hesapla
- En çok satan kategoriyi bul
- Kategorileri pasta grafiği gibi yüzdelik olarak göster
*/

function kategoriBazliSatisAnalizi(siparisler) {
  const detayMenu = restoran.menuler.flatMap((menuItem) =>
    menuItem.urunler.map((urun) => ({ ...urun, kategori: menuItem.kategori })),
  );
  const kategoriAnalizi = {};
  siparisler.map((siparis) =>
    siparis.urunler.map((siparisUrun) => {
      const urunDetay = detayMenu.find(
        (urunDetay) => urunDetay.id === siparisUrun.urunId,
      );
      if (kategoriAnalizi.hasOwnProperty(urunDetay.kategori)) {
        kategoriAnalizi[urunDetay.kategori].adet += siparisUrun.adet;
        kategoriAnalizi[urunDetay.kategori].toplamFiyat +=
          urunDetay.fiyat * siparisUrun.adet;
      } else {
        kategoriAnalizi[urunDetay.kategori] = {
          adet: siparisUrun.adet,
          toplamFiyat: urunDetay.fiyat * siparisUrun.adet,
        };
      }
    }),
  );
  let enCokSatanKategori = "";
  let maxAdet = 0;
  Object.keys(kategoriAnalizi).map((kategori) => {
    if (kategoriAnalizi[kategori].adet > maxAdet) {
      maxAdet = kategoriAnalizi[kategori].adet;
      enCokSatanKategori = kategori;
    }
  });

  Object.keys(kategoriAnalizi).map((kategori) => {
    let toplamAdet = 0;
    for (let kategori in kategoriAnalizi) {
      toplamAdet += kategoriAnalizi[kategori].adet;
    }
    kategoriAnalizi[kategori].yuzdelik = `${Math.trunc(
      (kategoriAnalizi[kategori].adet / toplamAdet) * 100,
    )}%`;
  });

  return kategoriAnalizi;
}
console.log(
  "Kategori Bazlı Satis Analizi:",
  kategoriBazliSatisAnalizi(restoran.siparisler),
);

/*
SORU 6: Kapsamlı Restoran Dashboard
Görev: Tüm fonksiyonları birleştirerek kapsamlı bir dashboard oluştur.

ÖNEMLİ: Bu kısım yani 6. soru daha sonra istenirse yapılabilir. Yani 5. sprintten sonra bir web uygulaması üzerinden gösterilerek yapılabilir.
*/
