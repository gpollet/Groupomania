import {reactive} from 'vue'

export const user = reactive({
  userId: null,
  token: null,
  role: null,
})

export const postContent = reactive({
  text_content: null,
  image: null,
})

export const data = reactive({ posts : {}})

export const postsForm = (async (axiosMethod, route, newContent) => {
  let formData = new FormData()
  formData.append('text_content', newContent.textContent)
  formData.append('image', newContent.imageUrl)
  await axiosMethod(`${route}`,
    formData
    , { headers: { "Content-Type": "multipart/form-data", "Authorization": "Bearer " + user.token } }).then(() => {
      needRefresh.status = true
    })
})

export const needRefresh = reactive({status: false})