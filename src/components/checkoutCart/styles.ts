import { keyframes, styled } from "@/src/styles";

export const CheckoutModal = styled('div', {
  zIndex: 1,

  variants: {
    isCheckoutOpen: {
      true: {
        position: 'fixed',
        width: '100%',
        height: '100%',
        '> div': {
          // background: 'rgba(0, 0, 0, 0.6)',
          width: '100%',
          height: '100%',
        }
      },
      false: {}
    }
  }
})

const animationBegin = keyframes({
  '0%': { opacity: 0, transform: ' translateX(100%)' },
  '100%': { opacity: 1, transform: 'translateX(0%)' }
})

const animationEnd = keyframes({
  '0%': { opacity: 1, transform: 'translateX(0%)' },
  '100%': { opacity: 0, transform: 'translateX(100%)' }
})

export const CheckoutCartSideModal = styled('aside', {
  display: 'flex',
  flexDirection: 'column',

  position: "fixed",
  top: 0,
  right: 0,

  transition: 'all 0.1s',
  backgroundColor: '$gray800',
  boxShadow: '-4px 0px 12px 0px #090909',
  height: '100%',

  variants: {
    checkoutCart: {
      true: {
        padding: '2rem',
        width: '30rem',
        animation: `${animationBegin} 0.4s`,
      },
      false: {
        width: '0rem',
        animation: `${animationEnd} 0.4s`,
      }
    }
  },

  'button[type=button]': {
    cursor: 'pointer',
    width: 24,
    height: 24,
    lineHeight: 0,
    color: '$gray300',
    border: 0,
    background: "none",
    fontSize: '$lg',
    marginLeft: "auto"
  },
});

export const CheckoutSection = styled('section', {
  marginTop: '2rem',

  '> strong': {
    fontSize: '$lg'
  },

  ul: {
    marginTop: '2rem',
    listStyle: 'none',
    overflow: 'auto',
    height: '450px',

    li: {
      display: 'flex',
      gap: '1rem',

      'div:first-child': {
        width: '100%',
        maxWidth: 94,
        height: 94,
        background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
        borderRadius: 8,
        padding: '0.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        img: {
          objectFit: 'cover',
        }
      },

      'div:nth-child(2)': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'flex-start',

        strong: {
          color: '$white'
        },

        button: {
          cursor: 'pointer',
          background: 'none',
          border: 0,
          color: '$green500',
          fontWeight: 700,
          fontSize: '$sm',

          '&:hover': {
            filter: 'brightness(1.5)'
          }
        }
      }
    },
    'li + li': {
      marginTop: '1rem'
    }
  }
});

export const CheckoutFooter = styled('footer', {
  display: "flex",
  marginTop: 'auto',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.875rem',

  div: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',

    'strong:first-child': {
      fontSize: '$md'
    },
    'strong:nth-child(2)': {
      fontSize: '$xl'
    },
  },

  button: {
    marginTop: '2rem',
    background: '$green500',
    color: '$white',
    fontSize: '$sm',
    width: '100%',
    padding: '1.25rem 7.75rem',
    borderRadius: 8,
    border: 0,
    cursor: 'pointer',

    '&:hover': {
      filter: 'brightness(1.3)'
    }
  }
})