import ScrollEffects from './ScrollEffects';

const storySlides = [
  {
    no: '01 / PERSONALITY',
    tone: 'dark',
    title: ['まだ実力は', 'いらない'],
    image: '/images/generated/trainee-blue-v2.webp',
    imageClass: 'visual-trainee',
    points: ['未経験OK', '人柄採用', '人あたり重視'],
    body: [
      '未経験から追いつくのは難しい。成功するには、多くの人を蹴落とさなければいけない。',
      'そんなふうに思っていませんか。',
    ],
  },
  {
    no: '02 / ANSWER',
    tone: 'light',
    title: ['求めるのは', '人柄！'],
    image: '/images/generated/mentor-blue-v2.webp',
    imageClass: 'visual-mentor',
    points: ['信頼', '縁を大切に', '後から実力'],
    body: [
      'タマキ電気工業が大切にしているのは、人とのつながり、取引先との縁。',
      '人柄があれば、人はついてきます。実力は、そのあとからついてくる。',
    ],
  },
  {
    no: '03 / TWO ROUTES',
    tone: 'beige',
    title: ['選べる', '戦い方'],
    image: '/images/generated/routes-blue-v2.webp',
    imageClass: 'visual-routes',
    points: ['独立', '承継', '選べる未来'],
    body: [
      '戦い続け勝利をその手に掴み取る方法。',
      '戦わずして勝つ、さながら無血開城のような方法。',
    ],
  },
  {
    no: '04 / INDEPENDENCE',
    tone: 'dark image',
    title: ['戦い続け', '自分の城を', '持つ'],
    image: '/images/generated/independent-blue-v2.webp',
    imageClass: 'visual-independent',
    points: ['技術', '人脈', '経営相談'],
    support: {
      title: '独立までの伴走',
      items: ['現場で技術を覚える', '仕事・人脈の相談', '経営面まで相談できる'],
      className: 'support-independent',
    },
    body: [
      '社員の独立を推奨しています。',
      '技術はもちろん、経営に関する相談もいつでもできます。',
    ],
  },
  {
    no: '05 / SUCCESSION',
    tone: 'light',
    title: ['戦わずして', '勝つ'],
    image: '/images/generated/succession-blue-v2.webp',
    imageClass: 'visual-succession',
    points: ['少数精鋭', '派閥なし', '会社を継ぐ道'],
    body: [
      '社内で実力をつけ、代表に認められ、立場を上げていく道もあります。',
      '少数精鋭だから、派閥争いではなく成長に集中できます。',
    ],
  },
];

const tags = ['# 人柄', '# 信頼', '# 縁', '# 技術', '# 独立', '# 承継'];

const requirements = [
  ['職種', '電気工事士'],
  ['仕事内容', '照明設備工事 / 引き込み工事'],
  ['雇用形態', '正社員'],
  ['給与', '月給250,000円〜400,000円'],
  ['試用期間', '3ヶ月 ※条件面の変更なし'],
  ['勤務地', '千葉県流山市駒木台219-3'],
  ['勤務時間', '9:00〜18:00 / 実働8時間、休憩1時間'],
  ['休日休暇', '週休2日制（日曜＋他） / GW / 夏季 / 年末年始 / 有給'],
  ['福利厚生', '社会保険完備 / 賞与・昇給 / 交通費支給 / 資格取得支援 / 作業服支給 / 各種手当'],
];

export default function Home() {
  return (
    <>
      <div className="site-wrapper">
        <header className="lp-header">
          <a className="lp-logo" href="#hero" aria-label="トップへ">
            <span>タマキ電気工業</span>
          </a>
          <a className="header-button header-button-recruit" href="#requirements">
            募集要項
          </a>
          <a className="header-button header-button-entry" href="#entry">
            ENTRY
          </a>
        </header>

        <main className="lp-content" tabIndex={0} aria-label="採用ランディングページ">
          <section className="swipe-section video-intro" aria-label="オープニング動画">
            <div className="video-media" aria-hidden="true">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                src="/videos/main-visual.mov"
                data-loop-start="0.2"
                data-loop-end="15"
              />
              <span>RECRUIT MOVIE</span>
              <small>TAMAKI ELECTRIC</small>
            </div>
            <div className="swipe-cue">
              <span>SWIPE</span>
              <i />
            </div>
          </section>

          <section className="swipe-section hero" id="hero" aria-labelledby="hero-title">
            <div className="hero-photo" aria-hidden="true" />
            <div className="hero-copy">
              <p className="chapter">TAMAKI ELECTRIC RECRUIT</p>
              <h1 id="hero-title">
                <span>人柄で、</span>
                <span>勝てる道が</span>
                <span>ある。</span>
              </h1>
              <p>
                誰かを蹴落とすより、信頼されて強くなる。
                電気工事士として、独立も承継も目指せる会社です。
              </p>
            </div>
            <div className="tag-marquee" aria-hidden="true">
              {[...tags, ...tags].map((tag, index) => (
                <span key={`${tag}-${index}`}>{tag}</span>
              ))}
            </div>
          </section>

          {storySlides.map((slide) => (
            <section
              className={`swipe-section story-slide ${slide.tone}`}
              key={slide.no}
              aria-labelledby={`${slide.no}-title`}
            >
              <p className="chapter">{slide.no}</p>
              <div className="title-stack">
                <h2 id={`${slide.no}-title`}>
                  {slide.title.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </h2>
              </div>
              <img
                className={`story-visual ${slide.imageClass}`}
                src={slide.image}
                alt=""
                aria-hidden="true"
              />
              <div className="point-strips" aria-hidden="true">
                {slide.points.map((point) => (
                  <span key={point}>{point}</span>
                ))}
              </div>
              {slide.support && (
                <div className={`support-panel ${slide.support.className}`}>
                  <h3>{slide.support.title}</h3>
                  <ul>
                    {slide.support.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="story-body">
                {slide.body.map((text) => (
                  <p key={text}>{text}</p>
                ))}
              </div>
              <b className="giant-word" aria-hidden="true">
                {slide.no.split('/')[1].trim()}
              </b>
            </section>
          ))}

          <section className="swipe-section company-slide dark" aria-labelledby="company-title">
            <p className="chapter">06 / COMPANY</p>
            <h2 className="line-title" id="company-title">
              <span>会社情報</span>
              <small>COMPANY PROFILE</small>
            </h2>
            <p className="company-catch">
              流山から、信頼でつながる電気工事を。
            </p>
            <dl className="data-list">
              <div>
                <dt>会社名</dt>
                <dd>タマキ電気工業株式会社</dd>
              </div>
              <div>
                <dt>代表取締役</dt>
                <dd>玉城 征治</dd>
              </div>
              <div>
                <dt>本社</dt>
                <dd>〒270-0113 千葉県流山市駒木台219-3</dd>
              </div>
              <div>
                <dt>事業内容</dt>
                <dd>照明設備工事 / 引き込み工事</dd>
              </div>
              <div>
                <dt>採用職種</dt>
                <dd>電気工事士 / 正社員</dd>
              </div>
            </dl>
            <div className="company-message">
              <h3>人柄を見て、任せる会社です。</h3>
              <p>
                少数精鋭だからこそ、日々の姿勢や信頼関係がそのまま評価につながります。
                技術は入社後に磨きながら、独立も承継も目指せます。
              </p>
            </div>
          </section>

          <section className="scroll-section requirements" id="requirements" aria-labelledby="requirements-title">
            <p className="chapter dark-text">07 / JOB DESCRIPTION</p>
            <h2 className="line-title blue" id="requirements-title">
              <span>募集要項</span>
              <small>BASIC</small>
            </h2>
            <dl className="data-list job-data">
              {requirements.map(([term, desc]) => (
                <div key={term}>
                  <dt>{term}</dt>
                  <dd>{desc}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="scroll-section entry" id="entry" aria-labelledby="entry-title">
            <p className="chapter">08 / CONTACT</p>
            <h2 id="entry-title">
              <span>勝つための一歩は</span>
              <span>ここから</span>
            </h2>
            <p className="entry-lead">
              応募フォームはWordPress実装時に接続予定です。初稿では配置確認用として表示しています。
            </p>
            <form className="contact-form">
              <label>
                <span>お名前 <b>必須</b></span>
                <input type="text" name="name" autoComplete="name" />
              </label>
              <label>
                <span>メールアドレス <b>必須</b></span>
                <input type="email" name="email" autoComplete="email" />
              </label>
              <label>
                <span>電話番号</span>
                <input type="tel" name="tel" autoComplete="tel" />
              </label>
              <label>
                <span>応募・お問い合わせ内容 <b>必須</b></span>
                <textarea name="message" rows={4} />
              </label>
              <button type="button">送信する</button>
            </form>
          </section>
        </main>
      </div>

      <aside className="pc-rail pc-rail-left" aria-label="企業名">
        <a href="#hero">タマキ電気工業株式会社</a>
      </aside>
      <nav className="pc-rail pc-rail-right" aria-label="採用メニュー">
        <a className="rail-recruit" href="#requirements">募集要項</a>
        <a className="rail-entry" href="#entry">ENTRY</a>
      </nav>
      <ScrollEffects />
    </>
  );
}
