import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary, {
  accordionSummaryClasses,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const faqData = [
  {
    id: 'panel1',
    question: 'Do you offer charcoal-grilled meats?',
    answer: 'Yes, all our meat dishes are grilled over natural charcoal to ensure authentic flavor and aroma.',
  },
  {
    id: 'panel2',
    question: 'Are your meats fresh or frozen?',
    answer: 'We use fresh, locally sourced meats daily to maintain top quality and taste.',
  },
  {
    id: 'panel3',
    question: 'Can I reserve a table in advance?',
    answer: 'Absolutely! You can easily book a table through our "Book a Table" page or by calling us directly.',
  },
  {
    id: 'panel4',
    question: 'Do you serve imported meats?',
    answer: 'Yes, we offer a premium selection of imported meats like Wagyu and Angus depending on availability.',
  },
  {
    id: 'panel5',
    question: 'Do you have options for non-meat eaters?',
    answer: 'Yes, we offer a limited range of vegetarian dishes and sides like salads, rice, and appetizers.',
  },
  {
    id: 'panel6',
    question: 'Are the meats marinated? Can I order without marinade?',
    answer: 'Yes, our meats are marinated with our signature spice mix, but you can request plain meat if you prefer.',
  },
  {
    id: 'panel7',
    question: 'What are your working hours?',
    answer: 'We’re open daily from 12:00 PM to 00:00 midnight.',
  },
  {
    id: 'panel8',
    question: 'Do you offer delivery service?',
    answer: 'Yes, we provide delivery within a certain area. You can order through our website or delivery apps.',
  },
  {
    id: 'panel9',
    question: 'Can I host events or private parties at your restaurant?',
    answer: 'Yes, we have a dedicated space for private events. Please contact us to check availability and make a reservation.',
  },
  {
    id: 'panel10',
    question: 'Do you cook the meat to the requested doneness?',
    answer: 'Yes, you can choose your preferred level of doneness: Rare, Medium Rare, Medium, or Well Done.',
  },
];
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  backgroundColor: "#10181B",
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem', color: 'var(--highlight-color)' }} />} // لون السهم
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  fontFamily: "var(--font, 'Roboto', sans-serif)",
  color: 'var(--primary-text)', 
  fontSize: '1.1rem',
  fontWeight: 600,
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]: {
    transform: 'rotate(90deg)',
  },
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1),
  },
  ...theme.applyStyles?.('dark', {
    backgroundColor: 'rgba(255, 255, 255, .05)',
  }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
  fontFamily: "var(--font, 'Roboto', sans-serif)",
  fontSize: '1rem',
  color: 'var(--secondary-text)', 
  lineHeight: 1.6,
}));


const FaqAccordion = () => {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
              <div>
        {faqData.map((item) => {
          return <div key={item.id}>
      <Accordion expanded={expanded === item.id} onChange={handleChange(item.id)}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography component="span" fontSize="1.2rem" fontFamily="var(--font)">{item.question}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography fontSize="1.1rem" fontFamily="var(--font)">
            {item.answer}
          </Typography>
        </AccordionDetails>
      </Accordion>

          </div>
        })}

    </div>

    </>
  );
};

export default FaqAccordion;