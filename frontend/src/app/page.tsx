import MultiStepForm from '@/components/MultiStepForm';

export default function Home() {
  return (
    <main className="container">
      <header style={{ marginBottom: '3rem', marginTop: '2rem' }}>
        <h1 className="title">Post a Requirement</h1>
        <p className="subtitle">Tell us what you're looking for, and we'll connect you with the best professionals.</p>
      </header>

      <MultiStepForm />
      
    </main>
  );
}
