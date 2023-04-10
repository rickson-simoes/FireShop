import { styled } from "..";

export const SuccessContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  height: 656,

  h1: {
    fontSize: '$2xl',
    color: '$gray100',
  },

  p: {
    fontSize: '$xl',
    color: '$gray300',
    maxWidth: 560,
    textAlign: 'center',
    marginTop: '2rem',
    lineHeight: 1.4,
  },

  a: {
    display: 'block',
    marginTop: '5rem',
    fontSize: '$lg',
    color: '$green500',
    textDecoration: 'none',
    fontWeight: 'bold',

    '&:hover': {
      color: '$green300',
    }
  }
});

export const ProductsList = styled('div', {
  marginTop: 25,
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  rowGap: '1rem',
  maxWidth: 500,
  'div + div': {
    marginLeft: -58
  }
})

export const ImageContainer = styled('div', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  height: 145,
  borderRadius: '100%',
  boxShadow: '-9px 0px 8px 0px black',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  }
});
