import Container from '../components/container';
import GridContainer from '../components/grid-container';

export default function ProjectsPage() {
  return (
    <GridContainer css={{ backgroundColor: '#f9f9f9', padding: '20px' }}>
      <div>navbar</div>
      <GridContainer
        css={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}
      >
        <Container>Project 1</Container>
        <Container>Project 2</Container>
        <Container>Project 3</Container>
        <Container>Project 4</Container>
      </GridContainer>
      <div>footer</div>
    </GridContainer>
  );
}
