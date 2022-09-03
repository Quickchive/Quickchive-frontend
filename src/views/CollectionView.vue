<template>
  <div class="collection-view">
    <!-- 콜렉션 정보 설명 -->
    <header class="collection__header">
      <span class="collection__header-name">Collection</span>
      <div class="flex-container">
        <p class="collection__header-title">
          {{ filterTitle(collectionTitle) }}
        </p>
        <span class="collection__header-num"
          >총 {{ collectionData.length }}개</span
        >
      </div>
      <p class="collection__header-description">
        {{ collectionDescription }}
      </p>
    </header>
    <!-- 콜렉션 내 콘텐츠 -->
    <div class="flex-container--col">
      <div
        v-for="(content, index) in collectionData"
        :key="index"
        class="collection-contents__wrapper"
      >
        <!-- 번호 -->
        <div class="collection-contents__index">
          {{ index + 1 }}
        </div>
        <!-- 내용 -->
        <div class="collection-contents__text-wrapper">
          <p @click="toLink(content.link)" class="collection-contents__title">
            {{ filterTitle(content.title) }}
          </p>
          <p class="collection-contents__description">
            {{ filterDescript(content.description) }}
          </p>
          <span class="collection-contents__domain">
            {{ filterDomain(content.link) }}
          </span>
        </div>
        <!-- 이미지 -->
        <div class="collection-contents__img"></div>
      </div>
      <hr width="90%" color="#F4F6F8" size="1" />
    </div>
  </div>
</template>

<script>
import { fetchMyCollections } from "@/api/user";
export default {
  data() {
    return {
      collectionTitle: "비즈니스 모델 분석법",
      collectionDescription:
        "비즈니스 모델 수립 및 분석은 PM의 핵심역량이다. 주니어 PM이 서비스를 개선하거나, 새로운 기능을 추가할 때 이 콜렉션을 본다면 많은 도움이 될 것이다. 공백포함 100자이내 ",

      collectionData: [
        // 더미 데이터
        {
          title:
            "[Killing Playlist] 과몰입주의 🤦💦 언제 들어도 심장 뛰는 내 인생 드라마 🎬 OST 플레이리스트ㅣ 딩고뮤직",
          link: "https://www.youtube.com/watch?v=SHn_z7qLaTQ",
          description:
            "이 구역 드덕들 다 모여 🙌플리 틀었을 뿐인데 드라마 속 주인공으로 변한 썰 푼다,,,[Killing Playlist] 과몰입 주의 🤦💦 언제 들어도 심장 뛰는 내 인생 드라마 🎬 OST 플레이리스트",
        },
        {
          title:
            "[Killing Playlist] 과몰입주의 🤦💦 언제 들어도 심장 뛰는 내 인생 드라마 🎬 OST 플레이리스트ㅣ 딩고뮤직",
          link: "https://www.youtube.com/watch?v=SHn_z7qLaTQ",
          description:
            "이 구역 드덕들 다 모여 🙌플리 틀었을 뿐인데 드라마 속 주인공으로 변한 썰 푼다,,,[Killing Playlist] 과몰입 주의 🤦💦 언제 들어도 심장 뛰는 내 인생 드라마 🎬 OST 플레이리스트",
        },
        {
          title:
            "[Killing Playlist] 과몰입주의 🤦💦 언제 들어도 심장 뛰는 내 인생 드라마 🎬 OST 플레이리스트ㅣ 딩고뮤직",
          link: "https://www.youtube.com/watch?v=SHn_z7qLaTQ",
          description:
            "이 구역 드덕들 다 모여 🙌플리 틀었을 뿐인데 드라마 속 주인공으로 변한 썰 푼다,,,[Killing Playlist] 과몰입 주의 🤦💦 언제 들어도 심장 뛰는 내 인생 드라마 🎬 OST 플레이리스트",
        },
        {
          title:
            "[Killing Playlist] 과몰입주의 🤦💦 언제 들어도 심장 뛰는 내 인생 드라마 🎬 OST 플레이리스트ㅣ 딩고뮤직",
          link: "https://www.youtube.com/watch?v=SHn_z7qLaTQ",
          description:
            "이 구역 드덕들 다 모여 🙌플리 틀었을 뿐인데 드라마 속 주인공으로 변한 썰 푼다,,,[Killing Playlist] 과몰입 주의 🤦💦 언제 들어도 심장 뛰는 내 인생 드라마 🎬 OST 플레이리스트",
        },
        {
          title:
            "[Killing Playlist] 과몰입주의 🤦💦 언제 들어도 심장 뛰는 내 인생 드라마 🎬 OST 플레이리스트ㅣ 딩고뮤직",
          link: "https://www.youtube.com/watch?v=SHn_z7qLaTQ",
          description:
            "이 구역 드덕들 다 모여 🙌플리 틀었을 뿐인데 드라마 속 주인공으로 변한 썰 푼다,,,[Killing Playlist] 과몰입 주의 🤦💦 언제 들어도 심장 뛰는 내 인생 드라마 🎬 OST 플레이리스트",
        },
        {
          title:
            "[Killing Playlist] 과몰입주의 🤦💦 언제 들어도 심장 뛰는 내 인생 드라마 🎬 OST 플레이리스트ㅣ 딩고뮤직",
          link: "https://www.youtube.com/watch?v=SHn_z7qLaTQ",
          description:
            "이 구역 드덕들 다 모여 🙌플리 틀었을 뿐인데 드라마 속 주인공으로 변한 썰 푼다,,,[Killing Playlist] 과몰입 주의 🤦💦 언제 들어도 심장 뛰는 내 인생 드라마 🎬 OST 플레이리스트",
        },
        {
          title:
            "[Killing Playlist] 과몰입주의 🤦💦 언제 들어도 심장 뛰는 내 인생 드라마 🎬 OST 플레이리스트ㅣ 딩고뮤직",
          link: "https://www.youtube.com/watch?v=SHn_z7qLaTQ",
          description:
            "이 구역 드덕들 다 모여 🙌플리 틀었을 뿐인데 드라마 속 주인공으로 변한 썰 푼다,,,[Killing Playlist] 과몰입 주의 🤦💦 언제 들어도 심장 뛰는 내 인생 드라마 🎬 OST 플레이리스트",
        },
        {
          title:
            "[Killing Playlist] 과몰입주의 🤦💦 언제 들어도 심장 뛰는 내 인생 드라마 🎬 OST 플레이리스트ㅣ 딩고뮤직",
          link: "https://www.youtube.com/watch?v=SHn_z7qLaTQ",
          description:
            "이 구역 드덕들 다 모여 🙌플리 틀었을 뿐인데 드라마 속 주인공으로 변한 썰 푼다,,,[Killing Playlist] 과몰입 주의 🤦💦 언제 들어도 심장 뛰는 내 인생 드라마 🎬 OST 플레이리스트",
        },
      ],
    };
  },
  methods: {
    // 콜렉션 리스트 조회
    async fetchCollectionsList() {
      try {
        const response = await fetchMyCollections();
        console.log("콜렉션 리스트 조회", response.collections);
        this.collectionData = response.collections;
      } catch (error) {
        console.log(error);
      }
    },
    // 제목 글자수 30자 이상
    filterTitle(title) {
      if (title.length >= 30) {
        return title.substr(0, 30) + "...";
      } else {
        return title;
      }
    },
    // 도메인 추출
    filterDomain(link) {
      // let link = this.favoritesList[index].link;
      let domain;
      if (link.includes("www") == true) {
        let domain1 = link.split(".");
        domain1 = domain1[1];
        domain = domain1;
      } else {
        // domain = domain[1];
        let pos1 = link.indexOf("//");
        let pos2 = link.substring(pos1 + 2);
        domain = pos2.split(".");
        domain = domain[0];
        // console.log(domain[1]);
      }
      return domain;
    },
    // 설명 글자수 30자 이상
    filterDescript(description) {
      if (description.length >= 90) {
        return description.substr(0, 90) + "...";
      } else {
        return description;
      }
    },
    toLink(link) {
      window.open(link, "_blank");
    },
  },
};
</script>

<style></style>
