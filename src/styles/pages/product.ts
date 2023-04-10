import { styled, keyframes } from "..";

export const ProductContainer = styled('main', {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  alignItems: 'stretch',
  gap: '4rem',

  maxWidth: 1180,
  margin: '0 auto'
});

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: 576,
  height: 656,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover'
  }
});

const scaleUp = keyframes({
  '0%': { transform: 'translateX(1rem);' },
  '100%': { transform: 'translateX(-1rem)' },
});

export const ProductDetails = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  h1: {
    fontSize: '$2xl',
    color: '$gray300'
  },

  span: {
    marginTop: '1rem',
    display: 'block',
    fontSize: '$2xl',
    color: '$green300'
  },

  p: {
    marginTop: '2.5rem',
    fontSize: '$md',
    lineHeight: 1.6,
    color: '$gray300'
  },

  button: {
    marginTop: 'auto',
    backgroundColor: '$green500',
    border: 0,
    color: '$white',
    borderRadius: 8,
    padding: '1.25rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: "$md",

    '&[disabled]': {
      cursor: 'not-allowed',
      backgroundColor: '$gray100',
      opacity: '0.5',
      color: '$gray800',
      animation: `${scaleUp} 0.4s`,
    },

    '&:hover:not([disabled])': {
      backgroundColor: '$green300'
    }
  }


});

export const LoadingRequest = styled('div', {
  maxWidth: 480,
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'center'
})