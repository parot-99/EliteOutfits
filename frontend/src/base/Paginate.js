import {Fragment} from 'react'
import {Pagination} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'


const Paginate = ({pages, page, isAdmin=false}) => {
  const link = isAdmin ? '/admin/products/page/' : '/page/' 

  return ( 
    <Fragment>
      {pages > 1 &&
        <Pagination variant='dark'>
          {[...Array(pages).keys()].map(x => (
            <LinkContainer key={x + 1} to={`${link}${x + 1}`}>
              <Pagination.Item active={x + 1 === page}>
                {x + 1}
              </Pagination.Item>
            </LinkContainer>
          ))}
        </Pagination>
      }
    </Fragment>
  )
}


export default Paginate
