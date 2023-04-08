import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Row,Col,Button,Form} from 'react-bootstrap'

const BookPage = () => {
    const[loading,setLoding] = useState(false);
    const[books,setBooks]=useState([]);
    const[total,setTotal]=useState(0);
    const[page,setPage]=useState(1);
    const[is_end,setIs_end]=useState(false);
    const[query,setQuery]=useState('리액트');

    const getBooks=async()=>{
        const url="https://dapi.kakao.com/v3/search/book?target=title";
        const config={
            headers: {"Authorization": "KakaoAK a9a4461d19237ef6842553e3146a2c00"},
            params:{"query": "query", "size":6, "page":page}
        }
        setLoding(true);
        const result= await axios.get(url, config);
        setBooks(result.data.documents);
        setTotal(result.data.meta.pageable_count);
        setIs_end(result.data.meta.is_end);
        console.log(result);
        setLoding(false);
    
    }

    useEffect(()=>{
        getBooks();
    },[page]);
    const onSubmit =(e) =>{
        e.preventDefalut();
        getBooks();
    }
    if(loading) return <h1 className='text-center my-5'>로딩중...</h1>
  return (
    <Row className='my-5 mx-2'>
        <Row>
              <Col>
                    <Form onSubmit={onSubmit}>
                        <Form.Control value={query}
                        onChange={(e)=>setQuery(e.target.value)} placeholder='검색어'/>
                    </Form>
              </Col>
    <div>검색수: {total}건</div>
    </Row>
    <hr/>
        <Col>
            <h1 className='text-center'>도서검색</h1>
            <Row>
                {books.map(book=>
                    <Col key={book.isbn} className='box m-2'>
                        <img src={book.thumbnail ? book.thumbnail :'http://via.placeholder.com/120x170'}/>
                        <div className='ellipsis'>{book.title}</div>
                        <div>{book.price}</div>
                    </Col>
                    )}
                    <div className='text-center my-3'>
                        <Button disabled={page==1 && true} onClick={()=>setPage(page-1)}>이전</Button>
                        <span className='my-3'>{page}</span>
                        <Button disabled={is_end && true} onClick={()=>setPage(page+1)}>다음</Button>
                    </div>
            </Row>
        </Col>
    </Row>

  )
}

export default BookPage;