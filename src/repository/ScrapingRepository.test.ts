import { ScrapingRepository } from "./ScrapingRepository";

test('テスト用の html から必要な情報を抜き出せること', () => {
  const repository = new ScrapingRepository();
  const urls = repository.getURLs(html);

  expect(urls?.calendar).toBe('https://www.chukyo-u.ac.jp/support/pdf/studentlife/buscallender2024.pdf');
  expect(urls?.timetable).toBe('https://www.chukyo-u.ac.jp/support/pdf/studentlife/bustime240425.pdf');
});

const html = `
<!doctype html>
<html lang="ja">

<head>
  <meta charset="utf-8">
  <meta name="sitelock-site-verification" content="5240" />
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>TEST</title>
</head>

<body id="id_20" class="page-template id-894 drawer drawer--right">

  <!--mainimage-->
  <div class="container">
    <div id="mainimage" class="mainimage-common">
    </div>
    <!--breadcrumb-->
    <nav id="breadcrumb" aria-label="breadcrumb" role="navigation">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="/">HOME</a></li>
        <li class="breadcrumb-item"><a href="https://www.chukyo-u.ac.jp/support/">学生支援</a></li>
        <!--PAGE TITLE-->
        <li class="breadcrumb-item">スクールバス（豊田キャンパス）</li>
      </ol>
    </nav>
  </div>

  <main class="content webpage" role="main">
    <!--main-->
    <div class="container">
      <div class="row">
        <div class="wow fadeIn col-12 col-lg-8 col-xl-9">
          <article class="article-main">
            <h2>スクールバス（豊田キャンパス）</h2>

            <!--main_contents-->
            <div class="text-center"><img src="/support/images/basu_01.gif" alt="basu_01" /></div>
            <div class="text-center"><img src="/support/images/basu_02_2.gif" alt="basu_02_2" /></div>

            <table align="center">
              <tbody>
                <tr>
                  <td><img src="/support/images/basu_03.gif" alt="basu_03" /></td>
                  <td><img src="/support/images/bus_04.jpg" alt="basu_04" /></td>
                </tr>
              </tbody>
            </table>

            <p class="text-center">豊田キャンパスと浄水駅を結ぶスクールバスは１日に70本運行されています。<br /> 浄水駅からは、10分位の乗車時間でキャンパスに到着します。</p>
            <ul>
              <li><a href="/support/pdf/studentlife/buscallender2024.pdf" target="_blank"
                  class="pdf">スクールバス運行カレンダー（2024年度）</a></li>
              <li><a href="/support/pdf/studentlife/bustime240425.pdf" target="_blank"
                  class="pdf">【A'ダイヤ】祝日講義日及び【定期試験期間ダイヤ】4/25更新</a></li>
              <li><a href="/support/pdf/studentlife/bustime-koudairenkei240905.pdf" target="_blank"
                  class="pdf">9月5日(木)高大連携学部授業のためのスクールバス時刻表</a></li>
              <li><a href="/support/pdf/studentlife/bustime-campus2024.pdf" target="_blank" class="pdf">キャンパス間連絡時刻表</a>
              </li>
              <li><a href="http://www.aikanrailway.co.jp/" target="_blank" class="win">愛知環状鉄道ホームページ</a></li>
              <li><a href="http://www.meitetsu.co.jp/train/index.asp" target="_blank" class="win">名古屋鉄道ホームページ</a></li>
            </ul>

          </article>
        </div>

        <div class="col-12 col-lg-4 col-xl-3">
          <article class="article-sub">

            <!--side_contents-->
            <section>
              <h4 class="sidemenu-title"><a href="/support/">学生支援</a></h4>
              <div id="sidemenu" class="sidemenu accordion-common" data-children=".item">
                <div class="item">

                  <div class="item-head"><a data-toggle="collapse" data-parent="#sidemenu"
                      href="#sidemenu-support-studentlife_toggle" aria-expanded="true" class="">学生支援</a></div>
                  <div id="sidemenu-support-studentlife_toggle" class="collapse show" role="tabpanel" style="">

                    <ul class="categoryitems">
                      <li><a href="/support/studentlife/a13.html">学生支援課</a></li>
                      <!--<li><a href="https://www.chukyo-u.ac.jp/research/cpco/" class="win" target="_blank">臨床心理相談室（カウンセリング）</a></li>-->
                      <li><a href="/support/studentlife/a2.html">健康管理</a></li>
                      <li><a href="/support/studentlife/a3.html">各種保険</a></li>
                      <li><a href="/support/studentlife/a4.html">アパート・下宿・学生寮</a></li>
                      <li><a href="/support/studentlife/a5.html">アルバイト</a></li>
                      <li><a href="/support/studentlife/a6.html">通学手段について</a></li>
                      <li class="active-page"><a href="/support/studentlife/a7.html">スクールバス（豊田キャンパス）</a></li>
                      <li><a href="/support/pdf/shuttlebus_nagoya-toyota.pdf" class="pdf" target="_blank">キャンパス間連絡バス<br
                            class="d-none d-lg-inline">（名古屋&hArr;豊田）</a></li>
                    </ul>
                  </div>
                </div>
                <div class="item">

                  <div class="item-head"><a data-toggle="collapse" data-parent="#sidemenu"
                      href="#sidemenu-support-harassment_toggle" aria-expanded="false" class="collapsed">キャンパスハラスメントの
                      防止と相談</a></div>
                  <div id="sidemenu-support-harassment_toggle" class="collapse" role="tabpanel" style="">

                    <ul class="categoryitems">
                      <li><a href="/support/harassment/h1.html">ハラスメント防止啓発等に関する宣言</a></li>
                      <li><a href="/support/harassment/h2.html">事例と防止</a></li>
                      <li><a href="/support/harassment/h3.html">学内相談員への相談申込み</a></li>
                      <li><a href="/support/harassment/h4.html">学外相談員への相談申込み</a></li>
                      <li><a href="/support/harassment/h5.html">相談員一覧</a></li>
                      <li><a href="/contact/harassment/confirm/confirm.php">相談お申込み</a></li>
                    </ul>
                  </div>
                </div>
                <div class="item">

                  <div class="item-head"><a data-toggle="collapse" data-parent="#sidemenu"
                      href="#sidemenu-support-career_2_toggle" aria-expanded="false" class="collapsed">資格取得支援</a></div>
                  <div id="sidemenu-support-career_2_toggle" class="collapse" role="tabpanel" style="">

                    <ul class="categoryitems">
                      <li><a href="/support/career_2/">資格センタートップ</a></li>
                      <li><a href="/support/career_2/d1.html">公務員合格実績と対策講座</a></li>
                      <li><a href="/support/career_2/d2.html">国家資格合格実績と対策講座</a></li>
                    </ul>
                  </div>
                </div>
                <div class="item">

                  <div class="item-head"><a data-toggle="collapse" data-parent="#sidemenu"
                      href="#sidemenu-support-career_3_toggle" aria-expanded="false" class="collapsed">教員採用支援</a></div>
                  <div id="sidemenu-support-career_3_toggle" class="collapse" role="tabpanel" style="">

                    <ul class="categoryitems">
                      <li><a href="/support/career_3/">教職センタートップ</a></li>
                      <li><a href="/support/career_3/t1.html">教員採用試験実績・教員免許状取得者の進路先</a></li>
                      <li><a href="/support/career_3/t2.html">各種規程・教員養成に対する理念等</a></li>
                      <li><a href="/support/career_3/t3.html">教職科目担当教員一覧および業績等</a></li>
                    </ul>
                  </div>
                </div>
                <div class="item">

                  <div class="item-head"><a data-toggle="collapse" data-parent="#sidemenu"
                      href="#sidemenu-support-facilities_toggle" aria-expanded="false" class="collapsed">施設・設備、福利厚生</a>
                  </div>
                  <div id="sidemenu-support-facilities_toggle" class="collapse" role="tabpanel" style="">

                    <ul class="categoryitems">
                      <li><a href="/extension/library/">図書館</a></li>
                      <li><a href="/student-staff/it/">コンピュータ演習室・自習室</a></li>
                      <li><a href="/support/studentlife/a8.html">学習施設</a></li>
                      <li><a href="/support/studentlife/a9.html">スポーツ施設</a></li>
                      <li><a href="/information/facility/g5.html">セミナーハウス</a></li>
                      <li><a href="/support/studentlife/a12.html">学生優待</a></li>
                    </ul>
                  </div>
                </div>
                <div class="item">

                  <div class="item-head"><a data-toggle="collapse" data-parent="#sidemenu"
                      href="#sidemenu-support-activity_toggle" aria-expanded="false" class="collapsed">課外活動支援</a></div>
                  <div id="sidemenu-support-activity_toggle" class="collapse" role="tabpanel" style="">

                    <ul class="categoryitems">
                      <li><a href="/support/sports/">スポーツ振興部</a></li>
                      <li><a href="https://chukyo-sports.com/" class="win" target="_blank">スポーツサイト</a></li>
                      <li><a href="/activity" class="in_site">文化会・課外活動</a></li>
                      <li><a href="http://club.chukyo-u.ac.jp/~gakusai_n/" class="win" target="_blank">大学祭（名古屋キャンパス）</a>
                      </li>
                      <li><a href="http://club.chukyo-u.ac.jp/~gakusai_t/" class="win" target="_blank">大学祭（豊田キャンパス）</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="item">

                  <div class="item-head"><a data-toggle="collapse" data-parent="#sidemenu"
                      href="#sidemenu-support-cafeteria_toggle" aria-expanded="false" class="collapsed">学生食堂</a></div>
                  <div id="sidemenu-support-cafeteria_toggle" class="collapse" role="tabpanel" style="">

                    <ul class="categoryitems">
                      <li><a href="/support/cafeteria/">学内飲食施設・店舗</a></li>
                      <li><a href="/support/cafeteria/c1.html">イベント情報</a></li>
                    </ul>
                  </div>
                </div>
              </div><!--sidemenu-->
            </section>

          </article>
        </div>

      </div>
    </div>
  </main>
</body>

</html>
`;