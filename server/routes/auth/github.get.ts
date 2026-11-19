// GET /auth/github
import { sendRedirect } from 'nuxt/server'

export default defineOAuthGitHubEventHandler({
  async onSuccess(event, { user }) {
    await setUserSession(event, {
      user: {
        login: user.login,
        name: user.name || user.login,
        avatarUrl: user.avatar_url,
      },
    })
    return sendRedirect(event, '/')
  },
  onError(event, error) {
    console.error('Ошибка входа через Github', error)
    return sendRedirect(event, '/')
  },
})
