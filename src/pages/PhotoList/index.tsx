import React, { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import './style.scss';

import InfiniteScroll from '../../components/infiniteScroll/infiniteScroll';
import { getApi } from '../../services/api';
import { PokemonList } from '../../services/type';
import CardList from '../../components/cardList';
import SkeletonCard from '../../components/skeleton';

const ImageComponent = lazy(
	() => import('../../components/image'),
);

interface ApiParams {
  pageSize: number;
  page: number;
}

const PhotoList: React.FC = () => {
	
	const [ list, setList ] = useState<PokemonList[]>([])
  const [ filteredList, setFilteredList ] = useState<PokemonList[]>([])
  const [ searchParam, setSearchParam ] = useState<string>('')

  const [apiParams , setApiParams] = useState<ApiParams>({pageSize: 8, page: 0})
  const [loading, setLoading] = useState<boolean>(false);

  
  const updateList = useCallback(async (newApiList: any) => {
    const newList = [...list, ...newApiList] ;
    setLoading(false)
    setList(newList)
  }, [list])
  
  
  const fetchMyAPI = useCallback(async () => {
    const newPage = apiParams.page + 1;
    let response =  await getApi(`cards?page=${newPage}&pageSize=${apiParams.pageSize}`);
    setApiParams({...apiParams, page: newPage})
    updateList(response.data.data)
  }, [apiParams, updateList])
  
  
  useEffect(() => {
    setLoading(true);
    fetchMyAPI()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (searchParam) {
      
      let newFilteredList : PokemonList[] = [];
      
      list.map((item: PokemonList) => {

        let nameFilter: boolean = false;
        let descriptionFilter: boolean = false;
        let tagFilter: boolean = false;
        if (item.name.toLocaleLowerCase().indexOf(searchParam) !== -1) {
          nameFilter = true;
        } 
        if (item.attacks[0].text.toLocaleLowerCase().indexOf(searchParam) !== -1) {
          descriptionFilter = true;
        }
        if (item.abilities && item.abilities[0].text.toLocaleLowerCase().indexOf(searchParam) !== -1) {
          tagFilter = true;
        }
        if (nameFilter || descriptionFilter || tagFilter) {
          newFilteredList.push(item);
        }

        return newFilteredList;
      })
  
      if (newFilteredList) {
        setFilteredList(newFilteredList);
      } 

      setLoading(false);
    }
  },[list, searchParam])


	return (
    <div id="main-div" className="Container" style={{marginTop: '100px' , marginBottom: '30px'}} >
      <input placeholder="Search here for Name, Tag or Description" type="text" onChange={(e) => setSearchParam(e.target.value)}/>
      <CardList data={searchParam.length > 0 ? filteredList : list} loading={loading}/>
      
      {/* SETTING THE INFINITE SCROLL DIV TO RENDER */}
      {list.length > 0 && !loading && !searchParam && <InfiniteScroll loadMore={() => {
        setLoading(true);
        fetchMyAPI();
      }}/>}

      {/* EXAMPLE OF LAZYLOADING A PIC AND GETTING INFO FOR THE USER THER IS NO DATA ON HIS RESULTS */}
      <Suspense fallback={<SkeletonCard />}>
        {searchParam.length > 0 && filteredList.length === 0 && <ImageComponent src="noResults" /> }      
      </Suspense>


    </div>
	);
};

export default PhotoList;
