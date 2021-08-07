import axios from 'axios'

export default async ({ store, route, redirect }) => {
  if (!store.state.auth && !['/', '/callback'].includes(route.path)) {
    return redirect('/')
  }
}
