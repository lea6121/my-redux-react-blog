import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../Header'
import HomePage from '../../pages/HomePage'
import AboutPage from '../../pages/AboutPage'
import PostPage from '../../pages/PostPage'
import EditPostPage from '../../pages/EditPostPage'
import LoginPage from '../../pages/LoginPage'
import RegisterPage from '../../pages/RegisterPage'
import ArticlePage from '../../pages/ArticlePage'
import { useEffect } from 'react'
import { getAuthToken } from '../../utils'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, getMe } from '../../redux/reducers/userReducer'

const Root = styled.div`
  letter-spacing: 1px;
  max-width: 100vw;
  font-family: Baskerville, Georgia, 'Times New Roman', Times, serif;
`

const Loading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.9);
  font-weight: 600;
  color: white;
  font-size: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  z-index: 1;
`

function App() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.users.user)

  useEffect(() => {
    // 有 token 才 call api
    if (getAuthToken()) {
      dispatch(getMe())
    }
  }, [dispatch])

  return (
    <div value={{ user, setUser }}>
      <Root>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/about">
              <AboutPage />
            </Route>
            <Route path="/new-post">
              <PostPage />
            </Route>
            <Route path="/edit-post/:id">
              <EditPostPage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/register">
              <RegisterPage />
            </Route>
            <Route path="/posts/:id">
              <ArticlePage />
            </Route>
          </Switch>
        </Router>
      </Root>
    </div>
  )
}

export { Loading }

export default App
