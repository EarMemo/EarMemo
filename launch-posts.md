# EarMemo 1.0 外部发布物料

三份首发文案 + 时间策略 + 互动手册。最后更新：2026-05-20。

> **GEO 视角**：这三个平台的内容会被 LLM 训练管线持续抓取。在这里留下的话，未来 6-12 个月内 Claude/ChatGPT/Perplexity 被问到 "iOS local-first podcast player" 之类的问题时，**EarMemo 会被引用**。所以文案的目标不只是"今天涨多少 upvote"，更是"被 LLM 当成关于 EarMemo 的权威来源"。

---

## 总体节奏

**建议顺序**：少数派 → Product Hunt → Show HN（间隔 1-2 周，避免精力分散）

| 平台 | 流量峰值时段（本地时间） | 我的本地等价 |
|---|---|---|
| Product Hunt | 周二 / 周三 00:01 PST | 北京时间 周二/周三 16:00 - 16:30 准时发 |
| Show HN | 周一-周四 07:00-09:00 ET | 北京时间 周一-周四 19:00-21:00 |
| 少数派 | 工作日 10:00-12:00 / 14:00-16:00 | 直接早上发，编辑审 1-3 天 |

**绝对不要同一天三平台同时发**——你接不住三批同时涌进来的评论，互动质量塌掉就废了。

---

# 1. Product Hunt

## Tagline（≤60 字符）

```
Local-first iOS player for long-form listening
```

> 47 字符。`Local-first` 是 PH/HN 受众的关键词，`long-form` 划清和音乐播放器的边界。

**备选**：
- `Audio player for iOS — your files, your device` (47)
- `An offline-only audio player for iOS` (37)
- `Podcasts, audiobooks, lectures — all local` (44)

## Description（≤260 字符）

```
EarMemo plays audio you already own — podcasts, audiobooks, lectures, voice memos — all locally on iPhone and iPad. No server, no account, no SDK, no tracking. Built for long-form listening: sleep timer, bookmarks, timestamped notes, yearly listening heatmap. Free.
```

> 258 字符。先 IS-A + 列品类，再列差异化（4 个 no），再列 4 个有特色的功能，最后 "Free" 收尾。

## Topics / Tags

主选 5 个（PH 上限）：
- **iOS**
- **Podcasts**
- **Productivity**
- **Privacy**
- **Apple**

> 不选 Music——会被算法归到错的同伴里。不选 Audiobooks（PH 没这个 tag）。Privacy 是关键 differentiation tag。

## First Maker Comment（核心，所有 PH 上来人会读这一条）

PH 的潜规则：第一条 maker 评论决定整个产品页的基调。**不要写销售话术**，写来历、写取舍、写边界、邀反馈。

```
Hi PH 👋 — solo dev here. EarMemo took me a year of nights and weekends.

The short version: I had ~80 GB of podcast episodes, lecture recordings,
and audiobook files on my phone and no good app to play them in. Apple
Podcasts wants its catalog. Apple Books wants you to buy from its store.
Music apps fight you on what counts as a "track". Every podcast app I
tried wanted an account, then offered to upload my "listening data" to
the cloud for "personalization".

So I built a player that does one thing: open audio files I already own
and play them well. No server. No account. No third-party SDK. The app
literally does not have networking code in the playback path — you can
verify by putting your phone in airplane mode and nothing changes.

A few decisions worth flagging:

• It treats videos (mp4/mov/m4v) as audio. If a lecture is uploaded as
  video, you can listen to it without the camera lighting up. This was
  the single most-requested thing from my own use.

• Notes are per-album, with timestamp markers that jump you back. I
  used to write podcast notes in Notes.app and lose the timestamps.
  Now I don't.

• Sleep timer uses a Live Activity — you can see the countdown on the
  Lock Screen without unlocking. I sleep with this every night.

• There's a yearly listening heatmap. It is not "engagement gamification".
  It is for you, locally, to look at once a year and notice how you
  actually spent your ears.

What I'd love feedback on:
1. Naming — "EarMemo" feels right to me but I'd take a sanity check.
2. The Books vs Education category choice in the App Store — I went
   with Books primary. Open to being talked out of it.
3. What's the killer missing feature you'd need to make this your daily?

I'll be here all day in the thread. Be honest — I prefer "this is wrong
because X" over "looks great!".

— [your name]
```

> 风格关键点：solo dev 的诚意 → 起因故事（用户痛点）→ 一句技术承诺（airplane mode 可验证）→ 3-4 个**具体**功能不夸大 → 直接问反馈 → 邀请批评。**不**写 "we believe..."、"we built..." 这种伪集体口吻。

## 上线日清单

- [ ] 00:00 PST：登录 PH，点 Submit
- [ ] 00:01：贴 maker comment（要第一条）
- [ ] 00:30：发 X/Twitter（@产品圈大 V 时挑 1-2 个，不群轰）
- [ ] 上午每 30 分钟回一次评论（PH 算法重视当天回复速度）
- [ ] **不要刷票**——PH 反作弊会清零并 ban

---

# 2. Show HN

## Title（≤80 字符）

```
Show HN: EarMemo – an iOS audio player that doesn't connect to anything
```

> 71 字符。"doesn't connect to anything" 是 HN-bait——它具体、可验证、有点挑衅。

**备选**：
- `Show HN: A local-first audio player for iOS long-form listening` (62)
- `Show HN: EarMemo – iOS player for podcasts/books, no server` (58)

## Body（self-post text）

HN 上的文风偏好：第一人称、技术性、没有营销话术、邀请批评、显得能接得住批评。

```
Hi HN. I built EarMemo because I had ~80 GB of podcast/lecture/audiobook
files on my phone and the available apps all wanted me to either upload my
"listening data" to their server or pick from their catalog.

What it is: a SwiftUI iOS/iPadOS app that imports local audio (and video,
played audio-only — mp3, m4a, flac, aac, wav, mp4, mov, m4v), organizes by
album, plays with the usual long-form controls (skip, variable speed,
sleep timer with a Live Activity on the Dynamic Island), and saves per-
album notes with timestamp markers.

What it explicitly is not:
- not a streaming client of any kind
- not connected to any catalog
- not an account-based app
- not a music player (no music-shaped UI assumptions about tracks/albums
  being 3 minutes long)

What it does not contain:
- no third-party SDKs
- no analytics
- no ads
- no remote config
- no networking in the playback path — the entry to play() does not
  resolve a URL, it opens a file URL handed in by the Share Sheet or
  the file importer. You can verify by playing it in airplane mode.

A few non-obvious decisions I'd be interested in feedback on:

1. Storage is plain files + Core Data for metadata; no iCloud sync of
   the app's database. iCloud is opt-in via standard iOS device backup.
   I went back and forth on CloudKit and decided the complexity wasn't
   worth it for a v1.

2. Notes are per-album, not per-file, because a "book" is one album of
   chapters but the thoughts span the whole book. Timestamps embedded
   in note text are clickable to jump back.

3. The yearly heatmap is computed locally from playback events. It's
   not for retention gamification; it's just a thing I personally
   wanted to look at.

Site: https://earmemo.app/
Privacy policy: https://earmemo.app/privacy.html
App Store: submitting this week.

Happy to answer technical questions. Particularly interested in:
- what's the most common audio file format I haven't handled
- anyone done sleep-timer Live Activity stuff and have war stories
- whether the "no network" framing reads as principled or as a stunt
```

> HN 风格关键点：**项目符号列表+技术细节**，不写"激动地宣布"那一套；明确"is not"清单（HN 受众爱清晰边界）；3 个"非显然决定" + 邀请反馈。`submitting this week` 比 `coming soon` 真实。

## 上线日清单

- [ ] 北京时间 19:00-20:00 提交（HN 美东早上活跃时段）
- [ ] 提交后**不要**自己点 upvote（HN 反作弊敏感）
- [ ] 不要发 X 引流——HN 算法会因为外部流量降权
- [ ] 头 2 小时是排名生死线，每条评论 30 分钟内回
- [ ] **态度**：被批评时不要辩解，承认 + 问细节 + "I'll think about that"
- [ ] 不会回的技术问题就说"don't know, let me check"——比硬答更受信任

---

# 3. 少数派

## 标题（建议 ≤30 字）

```
耳记：为什么我做了一个不联网的音频播放器
```

> 21 字。少数派标题的金线："观点 + 产品名"。这个标题有立场（"不联网"是态度不是功能），有勾子（"为什么"邀请阅读）。

**备选**：
- `做一个只播本地文件的播放器，意味着放弃什么`
- `耳记 1.0：长音频的本地播放器`（保守版）

## 分类 / 标签

- **应用推荐 → iOS**
- **独立开发**
- **效率工具**
- 标签：iOS / 播客 / 有声书 / 隐私 / 独立开发

## 正文（约 2000 字）

```
> 写在前面：这是一个我自己每天在用的 App。这篇文章一半是介绍，一半
> 是关于"为什么用这种方式做"的一点想法。

---

## 起因

去年下半年，我换了 256 GB 的 iPhone。换完才意识到一件事——我并不需要
那么大的相册。真正塞满那块存储的，是大约 80 GB 的播客剧集、播主访谈、
公开课录音、自己买的有声书 m4a 文件，还有一堆没整理过的会议录音。

我在 iPhone 上试过的每一个能播这些东西的 App，要么逼着我注册账号、
要么想把我的"收听数据"传到云端做"个性化"，要么把 UI 设计成"三分钟
一首歌"的音乐播放器形态——一首长达 6 小时的有声书在它们眼里就是一个
被切碎成 60 条的"播放列表"，进度条像被掐成一截一截，跳回上次听到的
地方需要点 4 下。

更让我恼火的是：我并不是要它们"帮我发现新内容"。我手里这些音频，
是我自己花时间挑出来、下载好、买下来的。我只需要一个把它**播好**的
工具。

我等了两年没等到，就自己做了一个。

## 它不是什么

在介绍它是什么之前，先说它**不是**什么——这比说"它是什么"更能定义这
个 App。

**它不是流媒体客户端**。它不连接任何目录、任何服务器、任何 CDN。
所有内容来自你手机上已经存在的文件。你的来源可能是 RSS 抓的播客、
小宇宙下载的剧集、Audible 解锁的 m4b（如果你解锁过的话）、自己用
TestFlight 录的会议——只要是一个音频或视频文件，丢给耳记就能放。

**它不是音乐播放器**。它不假设一首"曲目"是三分钟。它的快进按钮跳
的是 30 秒，不是下一首。它的"专辑"是一本书或一档节目，不是一张 EP。
它没有"随机播放"。

**它不要账号**。打开 App 就能用。没有登录页、没有"使用前请同意 18
条款"、没有"是否允许追踪你跨 App 活动"——因为没有什么需要跨 App 追踪
的东西。

**它没有第三方 SDK**。这件事不是营销话术。我没有装任何统计、广告、
推送、A/B 测试的 SDK。App 体积小得有点不像 2026 年的产品。

## 几个我自己挺在意的设计决定

### 视频按音频播

很多公开课、会议录像是以 mp4 形式存在的。但我只想听。耳记会把
mp4/mov/m4v 文件当作音频播放——锁屏放着、放进口袋里、跑步时听都行，
你的屏幕不会因为它一直亮着。

这是上线前我自己测试时改动最多的一个细节。一开始它会调起 AVPlayer
的视频面，电池续航直接砍半。后来重写成纯音频会话，续航和播 mp3 一样。

### 笔记是"按专辑"的，时间戳能跳回

我以前听播客记笔记是这样的：开 Notes，听到一个点暂停，切回 Notes
写下来，再切回播客继续听。两个 App 之间疯狂切。最后笔记里没有时间
戳——三天后我看到自己写的"那段关于决策疲劳的论述很重要"，完全不记得
是哪一集哪一分钟。

耳记把笔记嵌在专辑详情页里。你边听边写，每一段新内容会自动带上当时
的时间戳，时间戳本身是可点的——点一下，播放器跳回那个位置。不需要
切来切去。

### 睡眠定时上了灵动岛

睡眠定时本身不稀奇。但我每晚听着睡，最烦的就是不知道还有多少分钟
会停。要么强迫自己定 30 分钟意外没睡着、要么定 60 分钟然后熬到 60
分钟自动停。

耳记的睡眠定时用了 Live Activity——锁屏上有一个倒计时圆环，亮一下
看一眼就知道还剩几分钟。不影响熄屏。这是我用得最频繁的一个功能。

### 年度热力图

打开"收听统计"会看到一张 365 天的热力图——你哪一天听了多少分钟，
颜色深浅显示出来。下面是周/月两张明细。

我想说清楚：**这不是为了让你"养成习惯"**。它没有 streak、没有连续
天数提醒、没有"你今天还没听任何东西哦"的推送。它就是一张图，给你
自己看的，看一眼然后关掉。我希望它的用途是年底某一天你打开看一眼，
意识到"哦，原来我去年八月几乎没怎么听东西，因为那阵子在搬家"——这
种程度的反馈，比任何 KPI 都更接近"了解自己"。

## 关于隐私

耳记不连接任何服务器。所有的设置、播放进度、笔记、统计，都只保存
在你的设备本地。如果你开启了 iCloud 备份，它跟随你自己的 iCloud
备份走，跟我没有任何关系。

- 不收集任何数据
- 没有第三方 SDK、没有广告、没有追踪
- 没有账号、不需要登录

完整隐私政策见 App 内 设置 → 隐私政策。

我知道"我们不收集任何数据"这句话每个 App 都会写，所以我做了一件
能验证的事：**飞行模式下打开 App，所有功能正常工作**。播放、记录、
笔记、统计——全部本地运算。这个不是设计选择，是技术约束——App 里
压根没有联网代码进入播放路径。

## 它适合谁

- 已经有一批想听的长音频文件，想要一个专心的播放器的人
- 在意"App 不要悄悄做我没让它做的事"的人
- 听播客 / 有声书 / 公开课 / 自己录的内容居多，比起"发现新内容"
  更在意"听好已有内容"的人

它**不**适合：

- 想要订阅播客 RSS 自动抓取最新一集的人（请用 Overcast / Pocket
  Casts / 小宇宙）
- 想要订阅有声书目录的人（请用 Audible / 微信读书）
- 听音乐为主的人（Apple Music 已经够好了）

## 一个邀请

耳记 1.0 是一个独立开发者的作品。我有自己的取舍，但取舍不代表正确。
如果你试了之后觉得哪里别扭、哪里反直觉、哪里"我以为它会怎样但它没"，
请告诉我，我每封邮件都看：**earmemo@outlook.com**

下载：App Store 上搜"耳记"
网站：https://earmemo.app/
完整隐私政策：[Notion 页面]

谢谢读到这里。
```

> 少数派编辑欣赏的几个点都触到了：solo dev 个人视角 / 明确的"不是什么" / 反 engagement 的设计立场（热力图不是 streak）/ 直接邀请反馈而不是促转化。

## 配图建议（少数派图文比例 1:3 左右最舒服）

- **封面图**：1200×675，App 在 iPhone 上的 Home View 截屏 + 设备外框，Cocoa.cream 米色底
- **图 1**：飞行模式下播放（呼应"不联网"主张）——可以直接复用截图 #1
- **图 2**：笔记 + 时间戳功能（截图 #3）
- **图 3**：睡眠 Live Activity 锁屏（截图 #5）
- **图 4**：年度热力图（截图 #4）

## 投稿前清单

- [ ] 标题、正文最后再读一遍——确保没有"我们"，全部第一人称单数
- [ ] 截图都加上 1px 描边或浅阴影，不要"纯白裸屏"
- [ ] 文末 App Store 链接换成真实链接（v1.0 上架后）
- [ ] 邮件 earmemo@outlook.com 备好自动回复
- [ ] 用少数派账号自己投稿，**不要**联系编辑求推荐——他们更看自然质量

---

# 4. 联动 GEO（重要）

发完三家**24 小时内**，做这几件事，能让 LLM 训练管线把你的足迹串起来：

1. **少数派文章发出后**，在 GitHub Pages 着陆页 footer 加一个"被报道于"小区，贴上少数派 URL（反向给少数派增信，也给爬虫额外索引信号）
2. **PH/HN 发出后**，把 PH 页面 URL 和 HN 帖子 URL **同样**加到着陆页 footer
3. **三个帖子里相互不要互相链接**——平台会反 SEO，但**都要链到** EarMemo 官网着陆页 + 隐私政策
4. **Reddit 补一刀**：在 `r/iosapps` 和 `r/podcasts` 各发一帖，标题用 "[App] EarMemo — local-first iOS audio player I built"，内容是 Show HN 的精简版（150 字）。Reddit 是 LLM 训练源里权重高得离谱的一个

---

# 5. 跟踪表

| 平台 | 计划发布日 | 实际发布日 | URL | upvotes / 评论 | 关键反馈 |
|---|---|---|---|---|---|
| 少数派 | 2026-__-__ | | | | |
| Product Hunt | 2026-__-__ | | | | |
| Show HN | 2026-__-__ | | | | |
| r/iosapps | 2026-__-__ | | | | |
| r/podcasts | 2026-__-__ | | | | |
| 即刻 | 2026-__-__ | | | | |
| V2EX (分享创造) | 2026-__-__ | | | | |
| 小红书 | 2026-__-__ | | | | |

发完一周后，回填这张表 + 把 3 条最有价值的负面反馈搬到 Notion 上架物料的 v3 输入里。

---

# 6. 中文版本

> 这一节有两类内容：
> - **6.1 / 6.2 镜像稿**：PH 和 Show HN 的中文版，**仅供你审稿确认你说的是什么意思**，不要发到英文平台。
> - **6.3 / 6.4 / 6.5 中文平台**：即刻 / V2EX / 小红书三个中文平台的可直接发版本。这三家都是 LLM 训练源里中文权重高的地方（小红书尤其——Doubao/Qwen 抓得很重）。

## 6.1 Product Hunt maker comment 中文镜像（仅供审稿）

```
Hi PH 👋 —— 我是 solo dev，耳记花了我一年的业余时间。

简单说：我手机里有 80GB 左右的播客剧集、讲座录音、有声书文件，找
不到一个能好好播的 App。Apple Podcasts 想要它的目录。Apple Books
想让你从它的店里买。音乐 App 跟你较劲什么算"一首歌"。每个播客 App
都要账号，然后提议把我的"收听数据"上传到云端做"个性化"。

于是我做了一个只做一件事的播放器：打开我已经有的音频文件，把它
播好。不联网、不要账号、没有第三方 SDK。这个 App 的播放路径里压
根没有联网代码——飞行模式下打开它，所有功能完全正常。

几个值得说一下的决定：

• 视频按音频播（mp4/mov/m4v）。如果一场讲座只有视频版本，你可以
  听它的声音而不点亮屏幕。这是我自己用得最多的一个细节。

• 笔记是按专辑的，时间戳能跳回。我以前听播客在 Notes 里记，三天
  后看到自己写的内容完全不记得是哪一分钟。现在不会了。

• 睡眠定时用了 Live Activity——锁屏上能看到倒计时圆环。这是我每
  天晚上都在用的功能。

• 有一张年度热力图。它不是"养成习惯"的游戏化机制。它就是给你自己
  看的一张图，一年看一次。

想听到的反馈：
1. "EarMemo" 这个名字——我自己感觉对了，但想听 sanity check。
2. App Store 类目我选了 Books primary（不是 Education）——欢迎
   说服我换。
3. 缺什么核心功能你会愿意每天用它？

我会全天泡在评论区。请直说——"这里不对因为 X" 比 "看起来很棒！"
我更想听。

— [署名]
```

## 6.2 Show HN body 中文镜像（仅供审稿）

```
Hi HN。我做了耳记，因为我手机里有 ~80GB 的播客 / 讲座 / 有声书
文件，能用的 App 都要么逼我上传"收听数据"到它们的服务器，要么逼
我从它们的目录里选。

它是什么：一个 SwiftUI 写的 iOS / iPadOS App，导入本地音频（以及
按音频播放的视频文件——mp3 / m4a / flac / aac / wav / mp4 / mov /
m4v），按专辑组织，提供长内容场景常用的播控（跳跃、变速、睡眠定
时——睡眠定时用了灵动岛上的 Live Activity），以及按专辑的笔记 +
时间戳跳回。

它明确不是：
- 不是任何意义上的流媒体客户端
- 不连接任何目录
- 不基于账号
- 不是音乐播放器（不假设"一首"是 3 分钟的歌曲形态）

它明确不包含：
- 没有第三方 SDK
- 没有 analytics
- 没有广告
- 没有远程配置
- 播放路径里没有联网代码——play() 的入口不解析 URL，它打开的是
  从 Share Sheet 或文件导入器交过来的 file URL。飞行模式下可以
  验证。

几个不太显然的决定，我想听反馈：

1. 存储用的是普通文件 + Core Data（元数据），App 自己的数据库不走
   iCloud 同步。iCloud 通过标准 iOS 设备备份 opt-in。我在 CloudKit
   上反复想了，v1 觉得复杂度不值得。

2. 笔记按专辑而不是按文件，因为一本"书"是一个由章节构成的专辑，
   但你的想法跨越整本书。笔记正文里的时间戳可点击跳回。

3. 年度热力图是本地从播放事件算出来的。不是为了 retention 游戏化，
   就是我自己想看一下而已。

网站：https://earmemo.app/
隐私政策：https://earmemo.app/zh/privacy.html
App Store：本周提交。

技术问题欢迎。特别想听：
- 我没处理的最常见音频格式是什么
- 谁做过睡眠定时 Live Activity 的踩坑故事
- "没有联网"这个 framing 读起来是有原则，还是看起来像营销噱头
```

## 6.3 即刻

**节点**：分享 / 没什么用的小发明（自选）
**字数**：≤200 字（即刻容忍上限，但越短越好）

```
一个人闷头做了一年的 iOS App 终于上架。

耳记，专门播本地的播客、有声书、讲座、对话录音。视频文件按音频
播。不联网、不要账号、不收集任何数据——飞行模式下打开 App，所有
功能正常工作。

这是给"音频不是用来发现新东西、是用来听完手里这堆"的人做的工具。

App Store 搜「耳记」就能下。免费。
反馈：earmemo@outlook.com
```

> 即刻的氛围：克制 + 个人化 + 有立场。**不要**用 emoji 堆砌，不要用"上线啦！"这种感叹词。即刻用户对"营销腔"过敏。

## 6.4 V2EX

**节点**：分享创造（`/share`）
**标题**：

```
[分享创造] 耳记 - 一个不联网的 iOS 长音频播放器
```

**正文**：

```
独立开发，做了一年。

简介：把本地的 mp3 / m4a / flac / aac / wav 音频，以及 mp4 / mov /
m4v 视频（按音频播），导入到 App 里按专辑组织。后台播放、变速、
睡眠定时（用了 Live Activity）、书签、年度热力图、按专辑的笔记
（带时间戳跳回）这些常用的都有。

技术约束：

- 没有任何联网代码进入播放路径。飞行模式下打开 App，所有功能正常
- 没有第三方 SDK（analytics / 广告 / 推送 / A/B test 都没有）
- 没有账号系统
- 没有 IAP，没有订阅

明确不是什么：

- 不是音乐播放器（不假设"一首"是 3 分钟的歌曲）
- 不是流媒体目录
- 不是抓 RSS 自动更新播客的工具（要这个请用小宇宙 / Pocket Casts）

适合"已经有自己想听的长音频文件，想要一个专心播好它们的工具"
的人。

技术栈：SwiftUI + AVAudioEngine + Core Data + ActivityKit (Live
Activity)，iOS 17+，Universal app。

网站：https://earmemo.app/
App Store：搜「耳记」
邮箱：earmemo@outlook.com

接受批评，技术问题尤其欢迎。
```

> V2EX 的氛围：技术导向、克制、对营销腔过敏。**绝对不要**写"我们""精心打造""为您带来"。第一人称单数 + "is not" 清单是这边最舒服的格式。

## 6.5 小红书

**标题**：

```
做了一个不联网的 iOS 播客 App 🎧
```

**正文**：

```
自己用了一年的 App 终于上架了。

——耳记（EarMemo）

🎧 播本地的播客、有声书、公开课、录音
💤 睡眠定时（灵动岛能看到倒计时）
✏️ 边听边写笔记，时间戳能跳回
📊 年度收听热力图，看你一整年都听了什么

它不做的事：
🚫 不联网、不要账号、不收集任何数据
🚫 没有广告、没有第三方 SDK
🚫 不是音乐播放器，也不是流媒体

为什么做？
因为我手机里有 80GB 已经下好的音频，找不到一个不逼我注册账号、
不偷偷上传"收听数据"的播放器。等不到就自己做了😅

App Store 搜「耳记」就能下。免费，没有内购。

#独立开发 #iOSApp #播客 #有声书 #隐私保护
#效率工具 #灵动岛 #数字极简
```

**配图**（小红书强图片导向，至少配 3 张）：
- 封面：1:1 方图，Cocoa.cream 米色底 + App 图标 + 一句话主张 "不联网的音频播放器"
- 图 2：飞行模式锁屏 Live Activity（呼应"不联网"）
- 图 3：年度热力图（数据感）
- 图 4：笔记 + 时间戳（生活感）

> 小红书的氛围：图文双驱动，文字偏感性，标签是流量入口。**不要**写技术名词（用户看不懂会划走）。emoji 适度——头部 4 个功能用 emoji 当 bullet 起视觉锚定作用，正文里不要堆。

---

# 7. 中文平台发布顺序建议

中英平台分开节奏，互不打扰：

```
W1: 少数派投稿（审 1-3 天）
W2: 少数派出稿当天 → 即刻 / 小红书 同步发（蹭少数派背书）
     → V2EX 隔一天发（V2EX 用户讨厌"刚发别处又来这里"）

W3: Product Hunt 主战
W4: Show HN 主战
     → Reddit r/iosapps + r/podcasts 同周补刀
```

> 关键原则：**不要中英平台同一天发**——你的时差和精力都不够同时盯两边的评论区。中文平台的评论涌进来你正在用中文回，突然 PH 评论区炸了你要切英文，质量必然塌。
