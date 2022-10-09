# VideoCaptureCard-WebViewer
使用WebRTC技術，將usb擷取卡的影像與聲音訊號，直接顯示在網頁畫面上。  
Use WebRTC, show video and audio signals from usb video capture card.  

## Summary
使用了 WebRTC，將 usb capture card 擷取出的 video & audio 訊號，顯示在網頁上。  


## Scenario
如果你想投放 Nintendo Switch 的畫面到電腦螢幕，那有以下幾種做法。
1. 使用HDMI，從 Nintendo Switch 底座連接到螢幕。
2. 使用擷取卡/擷取盒，然後使用OBS捕捉視訊&音訊。

但這些方法對我而言，都有些不方便。  
- 直接使用螢幕，除非是特殊螢幕(支援PIP/PBP)，才能把遊戲視窗化，否則是直接佔用掉一個螢幕，需要手動切換訊號來源才能跟電腦一起使用，即使我是雙螢幕也嫌煩。
- 而如果用OBS，想要跟朋友分享遊戲畫面，就要再直播/串流到影音平台上。並且想串流的話，也需要高價位的擷取盒，才會更穩定...。

因此如果你想要...
- 不透過其他軟體，直接投放 Switch 畫面。
- 不想買高貴的擷取盒，但有買(或可以負擔)便宜的 usb 擷取卡(20美金以內)。
- 希望能看到視窗化的遊戲畫面，而不是占用整個螢幕。

那，可以嘗試使用這個網站工具。


## 設備需求
由於只是概略的做成，可能有無法預期的bug，因此提供我的測試設備：
1. Nintendo Switch（OLED款式）
2. Chrome瀏覽器
3. 擷取卡: [VC01 USB3.0轉HDMI影像擷取卡](https://24h.pchome.com.tw/prod/DCAX3W-A900EQPPF)


## 注意事項 & 問題排除
1. 需要要是 hdmi 接口的擷取卡才會有聲音輸出。
2. 需要允許網站使用攝影機與麥克風。
3. 如果只有影像或只有聲音，請嘗試重新插拔擷取卡。 
4. 理論上，要接其他掌上型遊戲機，只要是透過擷取卡的方式應該都能正確捕捉，但我沒有測試過，因此若有疑慮請勿衝動消費。