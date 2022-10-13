# VideoCaptureCard-WebViewer (Capture Card Viewer)  
キャプチャカードからビデオ信号と音声信号をキャプチャし、WebRTC APIを介してWebページの`<video>`要素に表示します。  
> Nintendo Switchのゲーム画面をパソコン画面上にキャプチャーして表示するためのものです  
  
  
將擷取卡採集到影像與音頻訊號，透過 WebRTC API 顯示在網頁的`<video>`元素上。  
> 原始設計為:在電腦畫面上擷取並顯示 Nintendo Switch 遊戲畫面  
  
  
Capture video and audio signals from the capture card and display them on the `<video>` element of the web page via the WebRTC API.   
> Originally designed to capture and display the Nintendo Switch game screen on the computer screen.  

  
## ガイドライン
[日本語版](README-jp.md)  
[中文版](README.md)  
[English version](README-en.md)  
  
## リンク
Repository > [https://github.com/Arce0406/VideoCaptureCard-WebViewer](https://github.com/Arce0406/VideoCaptureCard-WebViewer)  
  
ホームページ（Githubページでのホスト）> [https://arce0406.github.io/VideoCaptureCard-WebViewer/](https://arce0406.github.io/VideoCaptureCard-WebViewer/)  

## シナリオ
Nintendo Switchの画面をパソコンの画面に落としたい場合、いくつかの一般的な方法があります。  
1. Nintendo SwitchのドックからHDMIでスクリーンに接続する。
2. キャプチャーカードを使用し、OBSソフトで映像＆音声をキャプチャーする。
  
<br>
  
しかし、これらの方法は、私にとっては使い勝手が悪い。  
> パソコンの画面に直接接続すると、特殊な画面（PIP/PBP対応）でない限り、サブウインドウに表示するように対応しています。そうでない場合は、パソコンと同時に使用する場合、画面信号のソースを手動で切り替える必要があり、非常に面倒です。
  
> OBSでキャプチャする場合は、プレーヤーソフトに信号を出力するか、ストリーミングプラットフォーム（Youtube、Twitchなど）にライブ放送する必要があり、通常、遅延が発生する。
  
<br>
  
自分用に使って、たまに友達にゲーム画面を見せたいだけ。  
ライブストリーミングをしたいわけでもなく、遅延が発生するのも嫌です。  
> しかし、ライブストリーミングをしたいのであれば、高価なキャプチャーボックスが必要かどうかを評価することをお勧めします。
  
<br>
  
だから、もしあなたが私と同じように、ただ...  
- 画面全体を占有するのではなく、パソコンと同時に操作できるウィンドウ型のゲーム画面を見たい。
- 他のソフトや複雑な操作をせず、Nintendo Switchの画面を直接表示させたい。
- 高価なキャプチャーボックスは買いたくないが、安いusbキャプチャーカード（20ドル以内）であれば購入できる。
  
<br>
  
そこで、このWebツールの利用を検討してみてはいかがでしょうか。  


## 使用方法
以下はその手順です。  
1. Nintendo Switchの電源を入れ、HDMIケーブルを接続します。
2. HDMIをキャプチャカードに接続し、キャプチャカードをパソコンに接続する。
3. ウェブサイト[https://arce0406.github.io/VideoCaptureCard-WebViewer/](https://arce0406.github.io/VideoCaptureCard-WebViewer/)を開く。
4. デフォルトで設定画面が表示されますので、ビデオ＆オーディオソースをキャプチャカードに、オーディオ出力デバイスを指定します。
5. 設定モードを閉じて、お楽しみください。



## デバイスの規格
あくまでラフな考えなので、予測できないバグがあるかもしれないので、私のテスト機器のスペックを提示します。  
- Nintendo Switch（OLED）
- ブラウザー: Chrome (version 106.0.5249.103)
- キャプチャカード: [VC01 USB3.0轉HDMI影像擷取卡](https://24h.pchome.com.tw/prod/DCAX3W-A900EQPPF)


## 機能一覧
以下、機能一覧です。  
- :heavy_check_mark: キャプチャカードのストリームを `<video>` に表示します。 
    - 現在、ポーズ、フルスクリーン、サウンドのオン/オフ、サブウィンドウのオープンが可能です。 
- :x: スクリーンショット(将来の実装予定)


## ノート
よくあるご質問と注意点をまとめました。   
1. HDMIキャプチャカードは映像・音声の両方が出力されますが、VGAキャプチャカードは映像のみ出力されます。
2. Webサイトでカメラとマイクの使用を許可する必要があります。
3. 映像のみ（または音声のみ）が表示される場合は、キャプチャカードをもう一度抜き差ししてみてください。 
4. 理論的には、他の携帯ゲーム機を接続することができます。正しくキャプチャできるはずですが、テストしていないので、動作を保証するものではありません。
