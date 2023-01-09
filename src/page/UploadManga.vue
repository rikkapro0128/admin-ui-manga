<template>
  <div>
    <!-- THIS SECTION IMAGE -->
    <div class="flex ">
      <!-- THIS AVATAR MANGA -->
      <v-card v-ripple class="w-[216px] h-[255px] pa-4 rounded-lg cursor-pointer border-8 border-red-600">
        <div class="w-full h-full flex justify-center items-center">
          <div class="flex flex-col items-center">
            <v-icon size="large" icon="mdi-upload"></v-icon>
            <span class="text-caption mt-2 text-center" style="text-transform: uppercase !important;">ảnh đại diện
              của
              truyện.</span>
            <span class="text-subtitle-2 text-center">(nhỏ hơn 1mb)</span>
          </div>
        </div>
      </v-card>
      <!-- THIS COVER MANGA -->
      <v-card v-ripple
        class="flex-1 max-w-[840px] h-[255px] pa-4 ml-5 rounded-lg cursor-pointer border-8 border-red-600">
        <div class="w-full h-full flex justify-center items-center">
          <div class="flex flex-col items-center">
            <v-icon size="large" icon="mdi-upload"></v-icon>
            <span class="text-caption mt-2 text-center" style="text-transform: uppercase !important;">ảnh bìa
              của
              truyện.</span>
            <span class="text-subtitle-2 text-center">(nhỏ hơn 1mb)</span>
          </div>
        </div>
      </v-card>
    </div>
    <!-- THIS SECTION CONTENT -->
    <div class="mt-5 grid grid-cols-12 gap-5">
      <div class="col-span-5 space-y-5">
        <v-text-field label="Tên manga" hide-details="auto"></v-text-field>
        <v-select chips label="Thể loại" :items="genres" item-title="type" clearable multiple :eager="true"></v-select>
      </div>
      <div class="col-span-7">
        <v-textarea class="h-[230px]" label="Mô tả truyện" clearable></v-textarea>
      </div>
    </div>
    <!-- THIS SECTION CONTROL -->
    <div class="flex justify-end">
      <v-btn prepend-icon="mdi-note-check-outline">
        đăng truyện này
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
const genres = [
  {
    "type": "Action",
    "desc": "Thể loại này thường có nội dung về đánh nhau, bạo lực, hỗn loạn, với diễn biến nhanh"
  },
  {
    "type": "Adult",
    "desc": "Thể loại Adult đề cập đến vấn đề nhạy cảm, chỉ dành cho tuổi 17+"
  },
  {
    "type": "Adventure",
    "desc": "Thể loại phiêu lưu, mạo hiểm, thường là hành trình của các nhân vật"
  },
  {
    "type": "Anime",
    "desc": "Truyện đã được chuyển thể thành film Anime"
  },
  {
    "type": "Chuyển Sinh",
    "desc": "Thể loại này là những câu chuyện về người ở một thế giới này xuyên đến một thế giới khác, có thể là thế giới mang phong cách trung cổ với kiếm sĩ và ma thuật, hay thế giới trong game, hoặc có thể là bạn chết ở nơi này và được chuyển sinh đến nơi khác"
  },
  {
    "type": "Comedy",
    "desc": "Thể loại có nội dung trong sáng và cảm động, thường có các tình tiết gây cười, các xung đột nhẹ nhàng"
  },
  {
    "type": "Comic",
    "desc": "Truyện tranh Châu Âu và Châu Mĩ"
  },
  {
    "type": "Cooking",
    "desc": "Thể loại có nội dung về nấu ăn, ẩm thực"
  },
  {
    "type": "Cổ Đại",
    "desc": "Truyện có nội dung xảy ra ở thời cổ đại phong kiến."
  },
  {
    "type": "Doujinshi",
    "desc": "Thể loại truyện phóng tác do fan hay có thể cả những Mangaka khác với tác giả truyện gốc. Tác giả vẽ Doujinshi thường dựa trên những nhân vật gốc để viết ra những câu chuyện theo sở thích của mình"
  },
  {
    "type": "Drama",
    "desc": "Thể loại mang đến cho người xem những cảm xúc khác nhau: buồn bã, căng thẳng thậm chí là bi phẫn"
  },
  {
    "type": "Đam Mỹ",
    "desc": "Truyện tình cảm giữa nam và nam."
  },
  {
    "type": "Ecchi",
    "desc": "Thường có những tình huống nhạy cảm nhằm lôi cuốn người xem"
  },
  {
    "type": "Fantasy",
    "desc": "Thể loại xuất phát từ trí tưởng tượng phong phú, từ pháp thuật đến thế giới trong mơ thậm chí là những câu chuyện thần tiên"
  },
  {
    "type": "Gender Bender",
    "desc": "Là một thể loại trong đó giới tính của nhân vật bị lẫn lộn: nam hoá thành nữ, nữ hóa thành nam..."
  },
  {
    "type": "Harem",
    "desc": "Thể loại truyện tình cảm, lãng mạn mà trong đó, nhiều nhân vật nữ thích một nam nhân vật chính"
  },
  {
    "type": "Historical",
    "desc": "Thể loại có liên quan đến thời xa xưa"
  },
  {
    "type": "Horror",
    "desc": "Horror là: rùng rợn, nghe cái tên là bạn đã hiểu thể loại này có nội dung thế nào. Nó làm cho bạn kinh hãi, khiếp sợ, ghê tởm, run rẩy, có thể gây sock - một thể loại không dành cho người yếu tim"
  },
  {
    "type": "Josei",
    "desc": "Thể loại của manga hay anime được sáng tác chủ yếu bởi phụ nữ cho những độc giả nữ từ 18 đến 30. Josei manga có thể miêu tả những lãng mạn thực tế , nhưng trái ngược với hầu hết các kiểu lãng mạn lí tưởng của Shoujo manga với cốt truyện rõ ràng, chín chắn"
  },
  {
    "type": "Live action",
    "desc": "Truyện đã được chuyển thể thành phim"
  },
  {
    "type": "Manga",
    "desc": "Truyện tranh của Nhật Bản"
  },
  {
    "type": "Manhua",
    "desc": "Truyện tranh của Trung Quốc"
  },
  {
    "type": "Manhwa",
    "desc": "Truyện tranh Hàn Quốc, đọc từ trái sang phải"
  },
  {
    "type": "Martial Arts",
    "desc": "Giống với tên gọi, bất cứ gì liên quan đến võ thuật trong truyện từ các trận đánh nhau, tự vệ đến các môn võ thuật như akido, karate, judo hay taekwondo, kendo, các cách né tránh"
  },
  {
    "type": "Mature",
    "desc": "Thể loại dành cho lứa tuổi 17+ bao gồm các pha bạo lực, máu me, chém giết, tình dục ở mức độ vừa"
  },
  {
    "type": "Mecha",
    "desc": "Mecha, còn được biết đến dưới cái tên meka hay mechs, là thể loại nói tới những cỗ máy biết đi (thường là do phi công cầm lái)"
  },
  {
    "type": "Mystery",
    "desc": "Thể loại thường xuất hiện những điều bí ấn không thể lí giải được và sau đó là những nỗ lực của nhân vật chính nhằm tìm ra câu trả lời thỏa đáng"
  },
  {
    "type": "Ngôn Tình",
    "desc": "Truyện thuộc kiểu lãng mạn, kể về những sự kiện vui buồn trong tình yêu của nhân vật chính."
  },
  {
    "type": "One shot",
    "desc": "Những truyện ngắn, thường là 1 chapter"
  },
  {
    "type": "Psychological",
    "desc": "Thể loại liên quan đến những vấn đề về tâm lý của nhân vật ( tâm thần bất ổn, điên cuồng ...)"
  },
  {
    "type": "Romance",
    "desc": "Thường là những câu chuyện về tình yêu, tình cảm lãng mạn. Ớ đây chúng ta sẽ lấy ví dụ như tình yêu giữa một người con trai và con gái, bên cạnh đó đặc điểm thể loại này là kích thích trí tưởng tượng của bạn về tình yêu"
  },
  {
    "type": "School Life",
    "desc": "Trong thể loại này, ngữ cảnh diễn biến câu chuyện chủ yếu ở trường học"
  },
  {
    "type": "Sci-fi",
    "desc": "Bao gồm những chuyện khoa học viễn tưởng, đa phần chúng xoay quanh nhiều hiện tượng mà liên quan tới khoa học, công nghệ, tuy vậy thường thì những câu chuyện đó không gắn bó chặt chẽ với các thành tựu khoa học hiện thời, mà là do con người tưởng tượng ra"
  },
  {
    "type": "Seinen",
    "desc": "Thể loại của manga thường nhằm vào những đối tượng nam 18 đến 30 tuổi, nhưng người xem có thể lớn tuổi hơn, với một vài bộ truyện nhắm đến các doanh nhân nam quá 40. Thể loại này có nhiều phong cách riêng biệt , nhưng thể loại này có những nét riêng biệt, thường được phân vào những phong cách nghệ thuật rộng hơn và phong phú hơn về chủ đề, có các loại từ mới mẻ tiên tiến đến khiêu dâm"
  },
  {
    "type": "Shoujo",
    "desc": "Đối tượng hướng tới của thể loại này là phái nữ. Nội dung của những bộ manga này thường liên quan đến tình cảm lãng mạn, chú trọng đầu tư cho nhân vật (tính cách,...)"
  },
  {
    "type": "Shoujo Ai",
    "desc": "Thể loại quan hệ hoặc liên quan tới đồng tính nữ, thể hiện trong các mối quan hệ trên mức bình thường giữa các nhân vật nữ trong các manga, anime"
  },
  {
    "type": "Shounen",
    "desc": "Đối tượng hướng tới của thể loại này là phái nam. Nội dung của những bộ manga này thường liên quan đến đánh nhau và/hoặc bạo lực (ở mức bình thường, không thái quá)"
  },
  {
    "type": "Shounen Ai",
    "desc": "Thể loại có nội dung về tình yêu giữa những chàng trai trẻ, mang tính chất lãng mạn nhưng ko đề cập đến quan hệ tình dục"
  },
  {
    "type": "Slice of Life",
    "desc": "Nói về cuộc sống đời thường"
  },
  {
    "type": "Smut",
    "desc": "Những truyện có nội dung hơi nhạy cảm, đặc biệt là liên quan đến tình dục"
  },
  {
    "type": "Soft Yaoi",
    "desc": "Boy x Boy. Nặng hơn Shounen Ai tí."
  },
  {
    "type": "Soft Yuri",
    "desc": "Girl x Girl. Nặng hơn Shoujo Ai tí"
  },
  {
    "type": "Sports",
    "desc": "Đúng như tên gọi, những môn thể thao như bóng đá, bóng chày, bóng chuyền, đua xe, cầu lông,... là một phần của thể loại này"
  },
  {
    "type": "Supernatural",
    "desc": "Thể hiện những sức mạnh đáng kinh ngạc và không thể giải thích được, chúng thường đi kèm với những sự kiện trái ngược hoặc thách thức với những định luật vật lý"
  },
  {
    "type": "Thiếu Nhi",
    "desc": "Truyện tranh dành cho lứa tuổi thiếu nhi"
  },
  {
    "type": "Tragedy",
    "desc": "Thể loại chứa đựng những sự kiện mà dẫn đến kết cục là những mất mát hay sự rủi ro to lớn"
  },
  {
    "type": "Trinh Thám",
    "desc": "Các truyện có nội dung về các vụ án, các thám tử cảnh sát điều tra..."
  },
  {
    "type": "Truyện scan",
    "desc": "Các truyện đã phát hành tại VN được scan đăng online"
  },
  {
    "type": "Truyện Màu",
    "desc": "Tổng hợp truyện tranh màu, rõ, đẹp"
  },
  {
    "type": "Webtoon",
    "desc": "Là truyện tranh được đăng dài kỳ trên internet của Hàn Quốc chứ không xuất bản theo cách thông thường"
  },
  {
    "type": "Xuyên Không",
    "desc": "Xuyên Không, Xuyên Việt là thể loại nhân vật chính vì một lý do nào đó mà bị đưa đến sinh sống ở một không gian hay một khoảng thời gian khác. Nhân vật chính có thể trực tiếp xuyên qua bằng thân xác mình hoặc sống lại bằng thân xác người khác."
  }
]
</script>

<style scoped>

</style>