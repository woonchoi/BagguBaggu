import React from 'react';
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { authInstance } from 'api/axios';
import requests from 'api/config';
import TopBar2 from 'components/common/TopBar2';
import UserInfo from 'components/common/UserInfo';
import BagguOfferList from './BagguOfferList';
import { get_user } from 'api/apis/user';
import tw, { styled, css } from 'twin.macro';
import FormatDate from 'hooks/FormatDate';
import GetRelativeTime from 'hooks/GetRelativeTime';
import option_button from 'assets/icons/option_button.svg';
import Carousel from './Carousel';
import Chip from 'components/common/Chip';
import ItemModal from './ItemModal';
import BottomBar from 'components/common/BottomBar';
import Carousel2 from './Carousel2';
import Carousel3 from './Carousel3';
const Container = styled.div`
  ${tw`w-full`}
`;
const Wrapper = tw.div`flex p-2 border-b justify-between`;
const Info = styled.div`
  ${tw`relative flex mr-2 overflow-hidden box-content whitespace-nowrap text-ellipsis`}
  ${css`
    width: calc(100% - 112px);
  `}

  & {
    section {
      ${tw`flex-col`}
    }
  }
`;

const Title = tw.p`text-main-bold text-xl `;
const Message = tw.span`text-sub`;
const Product = styled.div`
  ${tw`w-80 h-80 rounded bg-cover bg-center`}
  ${props =>
    css`
      background-image: url(${props.img});
    `}
`;

function Item() {
  const userIdx = Number(localStorage.getItem('userIdx'));
  const [canOffer, setCanOffer] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [requestUserList, setRequsetUserList] = useState([]);
  const { id } = useParams();
  const [item, setItem] = useState([]);
  const [user, setUser] = useState([]);
  const { year, month, day, hour, minute } = FormatDate(item.createdAt);
  const date = GetRelativeTime(year, month, day);
  const navigate = useNavigate();

  const CategoryTypes = [
    '디지털기기',
    '생활가전',
    '가구/인테리어',
    '생활/주방',
    '여성의류',
    '여성잡화',
    '남성패션/잡화',
    '뷰티/미용',
    '스포츠/레저',
    '취미/게임/음반',
    '도서',
    '가공식품',
    '반려동물용품',
    '기타',
  ];

  const { data, isLoading } = useQuery(
    ['getUser', { userIdx: item.userIdx }],
    async () => await get_user(item.userIdx),
    { onSuccess: data => setUser(data) }
  );

  const deleteHandler = async id => {
    try {
      const { data } = await authInstance.delete(requests.ITEM(id));
      navigate('/');
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const canOfferHandler = () => {
    if (userIdx === item.userIdx) {
      setCanOffer(0);
    } else if (userIdx !== item.userIdx && item.requestUserList.length > 10) {
      setCanOffer(1);
    } else {
      setCanOffer(2);
    }
  };
  const editHandler = () => {
    navigate(`/item/${id}/edit`);
  };

  useEffect(() => {
    const get_item = async id => {
      try {
        const { data } = await authInstance.get(requests.ITEM(id));
        console.log(data);
        return setItem(data);
      } catch (error) {
        console.log(error);
      }
    };
    get_item(id);
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {showModal ? (
            <ItemModal
              onDelete={deleteHandler}
              onCancel={() => setShowModal(false)}
              onEdit={editHandler}
            />
          ) : (
            ''
          )}
          <TopBar2 />
          {/* <TopBar2
        title={`${userIdx === item.userIdx ? '교환할 물건 선택' : ''}`}
      /> */}
          <Container>
            <UserInfo user={user} />
            <Carousel3
              id="carousel3"
              imgUrls={[
                ...item.itemImgUrls,
                ...item.itemImgUrls,
                ...item.itemImgUrls,
                ...item.itemImgUrls,
              ]}
            />
            <div
              id="here"
              className="overflow-hidden p-2 flex w-full h-[300px] justify-center hover:bg-primary-hover border-b gap-2 relative"
            >
              {/* <Chip tradeState={item.tradeState} /> */}
            </div>
          </Container>
          <Wrapper>
            <Info>
              <section>
                <Title>{item.title}</Title>
                <Message>
                  {CategoryTypes[item.category]} | {item.dong} |{' '}
                  {GetRelativeTime(year, month, day, hour, minute)}
                </Message>
              </section>
            </Info>
            <img
              className={`${userIdx === item.userIdx ? '' : 'hidden'}`}
              onClick={() => setShowModal(true)}
              src={option_button}
              alt="profile_edit"
            />
          </Wrapper>
          <BottomBar
            showHeart={`${userIdx === item.userIdx ? false : true}`}
            canOffer={canOffer}
          />
        </div>
      )}
    </div>
  );
}

export default Item;
