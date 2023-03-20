Component({
  methods: {
    get(imgSrc) {
      // 通过 SelectorQuery 获取 Canvas 节点
      return new Promise((resolve, reject) => {

        let query = wx.createSelectorQuery().in(this)
        query.select('#canvas')
          .fields({
            node: true,
            size: true,
          })
          .exec(function (res) {
            const width = res[0].width
            const height = res[0].height
            const canvas = res[0].node
            const ctx = canvas.getContext('2d')
            const dpr = wx.getSystemInfoSync().pixelRatio
            canvas.width = width * dpr
            canvas.height = height * dpr
            ctx.scale(dpr, dpr)
            let img = canvas.createImage();
            img.src = imgSrc;
            img.onload = () => {
              ctx.drawImage(img, 0, 0, width, height);
              const imageData = ctx.getImageData(0, 0, width, height);
              const data = imageData.data
              var r = 1,
                g = 1,
                b = 1;
              // 取所有像素的平均值
              for (var row = 0; row < height; row++) {
                for (var col = 0; col < width; col++) {
                  if (row == 0) {
                    r += data[((width * row) + col)];
                    g += data[((width * row) + col) + 1];
                    b += data[((width * row) + col) + 2];
                  } else {
                    r += data[((width * row) + col) * 4];
                    g += data[((width * row) + col) * 4 + 1];
                    b += data[((width * row) + col) * 4 + 2];
                  }
                }
              }

              // 求取平均值
              r /= (img.width * img.height);
              g /= (img.width * img.height);
              b /= (img.width * img.height);

              // 将最终的值取整
              r = Math.round(r);
              g = Math.round(g);
              b = Math.round(b);
              resolve(`${r}, ${g}, ${b}`)
            };
          })
      })
    }
  }
})