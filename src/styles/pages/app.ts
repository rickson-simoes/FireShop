import { keyframes, styled } from "..";

export const Container = styled('div', {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  minHeight: "100vh",
});

export const Header = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  button: {
    marginRight: '1rem',
    backgroundColor: '$gray800',
    position: 'relative',

    padding: '0.75rem',

    width: 46,
    height: 46,

    borderRadius: 6,
    border: 'none',

    fontSize: '$lg',
    lineHeight: 0,
    transition: 'all 0.2s',
    cursor: 'pointer',

    '&:hover': {
      filter: 'brightness(1.2)'
    },

    span: {
      backgroundColor: '$green500',

      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

      position: 'absolute',
      top: -12,
      right: -10,

      color: '$white',
      fontSize: '$ss',
      fontWeight: '700',

      borderRadius: 100,
      width: 24,
      height: 24
    }
  }
});