import { styled } from "..";

export const HomeContainer = styled('main', {
  display: 'flex',
  justifyContent: 'flex-start',
  // gap: '3rem',
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1180px) /2))',
  marginLeft: 'auto',
  minHeight: 656,
});

export const Product = styled('div', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover'
  },

  footer: {
    position: 'absolute',
    bottom: '0.25rem',
    left: '0.25rem',
    right: '0.25rem',
    padding: '1rem',

    borderRadius: 6,

    display: 'flex',
    justifyContent: 'space-between',

    backgroundColor: 'rgba(0, 0, 0, 0.6)',

    transform: 'translateY(110%)',
    opacity: 0,
    transition: 'all 0.2s ease-in-out',

    'div': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: '0.5rem',

      strong: {
        fontSize: '$sm',
        color: '$gray100'
      },

      span: {
        fontSize: '$md',
        fontWeight: 'bold',
        color: '$green300'
      },
      button: {
        backgroundColor: '$green500',

        padding: '0.75rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        width: 56,
        height: 56,

        borderRadius: 6,
        border: 'none',

        fontSize: '$lg',
        lineHeight: '0',
        transition: 'all 0.2s',
        cursor: 'pointer',

        '&:hover:not[disabled]': {
          filter: 'brightness(1.5)'
        },
        '&[disabled]': {
          cursor: 'not-allowed',
        },
      }
    },
  },

  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1
    }
  }
});