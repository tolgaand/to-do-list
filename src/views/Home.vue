<template lang="pug">
  section#home
      a-result(title="Hoşgeldin! Seni gördüğüme sevindim🎉" subTitle="Yapılacak bir listen mi var? Hemen unutmadan siteye ekle.")
        template(slot="icon")
          a-icon(type="smile" theme="twoTone")
        template(slot="extra")
          a-button(type="primary" @click="$router.push({path:'/dashboard'})") Sayfamı Görüntüle
          a-button(to="register" @click="$router.push({path:'/register'})") Hemen Kayıt Ol!
</template>

<script>
export default {};
</script>
