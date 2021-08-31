import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { ResetStyle, GlobalStyle } from '../../globalStyle'
import { getPosts } from '../../redux/reducers/postReducer'
import { Loading } from '../../components/App/App'
import { useDispatch, useSelector } from 'react-redux'

const Root = styled.div`
  width: 80%;
  margin: 0 auto;
  padding-top: 100px;
  position: relative;
`

const PostsContainer = styled.div`
  border-bottom: 1px solid rgba(0, 12, 34, 0.2);
  padding: 40px 10px;
  border: 1px solid black;
  margin: 20px;
`

const PostTopContainer = styled.div`
  padding-bottom: 30px;
  margin: 0px 18px 15px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const PostTitle = styled(Link)`
  font-weight: 600;
  line-height: 4rem;
  font-size: 24px;
  color: #333;
  text-decoration: none;
`

const PostDate = styled.div`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.8);
`

const PostContent = styled.div`
  color: rgba(0, 0, 0, 0.8);
  margin: 0 18px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  white-space: pre-line;
  font-size: 19px;
  line-height: 4rem;
`

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`

const Pagination = styled(Link)`
  font-weight: 500;
  color: rgba(0, 0, 0, 0.7);
  text-decoration: none;
  margin: 10px 5px;
  font-size: 28px;
  padding: 10px 18px;
`
const PageTeller = styled.div`
  font-size: 16px;
  color: grey;
  text-align: center;
  padding: 0 0 50px;
`
function Post({ post }) {
  const location = useLocation()

  return (
    <PostsContainer>
      <PostTopContainer>
        <PostTitle
          to={`/posts/${post.id}`}
          $active={location.pathname === '/article'}
        >
          {post.title}
        </PostTitle>
        <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
      </PostTopContainer>
      <PostContent>{post.body}</PostContent>
    </PostsContainer>
  )
}

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1)
  const dispatch = useDispatch()
  const isLoadingPostsMsg = useSelector((store) => store.posts.isLoadingPosts)
  const posts = useSelector((store) => store.posts.posts)
  const totalPosts = useSelector((store) => store.posts.totalPosts)

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])

  function changePage(e) {
    const currentPageNum = Number(e.target.innerText)
    setCurrentPage(currentPageNum)
    dispatch(getPosts(currentPageNum))
  }

  function RenderPagination() {
    const totalPages = Math.ceil(totalPosts / 5)
    let pageNumbers = []
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i)
    }
    return (
      <>
        <PaginationContainer>
          {pageNumbers.map((value, index) => (
            <Pagination key={value} onClick={changePage}>
              {value}
            </Pagination>
          ))}
        </PaginationContainer>
        <PageTeller>
          第 {currentPage} 頁 / 共 {totalPages} 頁
        </PageTeller>
      </>
    )
  }

  return (
    <>
      <ResetStyle />
      <GlobalStyle />
      {isLoadingPostsMsg && <Loading>Loading...</Loading>}
      <Root>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
        <RenderPagination></RenderPagination>
      </Root>
    </>
  )
}
