const {
  Bookings,
  Trajet,
  User,
  Route,
  TaxiBe,
  Cooperative,
} = require("../models");
const fs = require("fs");
const path = require("path");
const pdf = require("html-pdf");

const generatePDFTicket = async (req, res) => {
  const bookingId = req.params.id;
  try {
    const booking = await Bookings.findOne({
      where: { id: bookingId, user_id: req.user.id },
      include: [
        {
          model: Trajet,
          include: [
            {
              model: TaxiBe,
              attributes: ["type", "matricule"],
              include: {
                model: Cooperative,
                attributes: ["name", "contact"],
              },
            },
            {
              model: Route,
              attributes: ["depart_city", "arrival_city"],
            },
          ],
        },
        {
          model: User,
          attributes: ["name", "email", "tel"],
        },
      ],
    });
    if (!booking) {
      return res.status(404).send({ message: "Reservation non trouvé! " });
    }
    const ticketCode = `TICKET-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
    const html = `
        <html>
        <head>
            <style>
                .body{font-family: Arial, Helvetica, sans-serif;}
                .container{text-align: center;margin: 50px;}
                .header{font-size: 24px;font-weight: bold;margin-bottom: 20px;}
                .details{font-size: 18px; margin-bottom: 10px;}
                .code{font-size: 20px; color:red; margin-top: 20px;}
                .io{color:#0ef;}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">Ticket de Reservation</div>
                <div class="details">Nom du passager : ${booking.User.name} </div>
                <div class="details">Email : ${booking.User.email}</div>
                <div class="details">Téléphone : ${booking.User.tel} </div>
                <div class="details">Trajet : ${booking.Trajet.Route.depart_city} à ${booking.Trajet.Route.arrival_city} </div>
                <div class="details">TaxiBe : ${booking.Trajet.TaxiBe.type} ${booking.Trajet.TaxiBe.matricule} </div>
                <div class="details io">Date : ${booking.Trajet.TaxiBe.Cooperative.name}-  ${booking.Trajet.TaxiBe.Cooperative.contact}   </div>
                <div class="details">Date : ${booking.Trajet.date} </div>
                <div class="details">Places reservés : ${booking.nb_mpandeha} </div>
                <div class="code">Code du Ticket : ${ticketCode} </div>
            </div>
        </body>
        </html>
        `;
        const pdfPath = path.join(__dirname, `../tickets/ticket-${bookingId}.pdf`);
        pdf.create(html).toFile(pdfPath, async (error, result)=>{
            if (error) {
                console.error("Erreur lors de la génération du pdf :", error);
                return res.status(500).send({error: "Une erreur est survenu lors de la génération diu pdf."});
            }
            booking.ticketCode = ticketCode;
            await booking.save();

            res.download(result.filename, `ticket-${bookingId}.pdf`, (downloadErr) =>{
                if (downloadErr) {
                    console.error("Erreur lors du telechargements du pdf : ", downloadErr);
                    res.status(500).send({error: "Une erreur est survenu lors du telechargement du pdf. "});
                }
            });
        });
  } catch (e) {
    res.status(500).send({
      message: "Internal Server Error!",
      error: e.message,
    });
  }
};

const verifyTicketCode = async (req, res) =>{
    const { ticketCode } = req.body;
    try{
        const booking= await Bookings.findOne({
            where: {ticketCode}
        });
        if (!booking) {
            return res.status(400).send({
                error :"Code de ticket incorrect ou reservation introuvable."
            });
        }
        if (booking.is_booked) {
            return res.status(400).send({message: "Cette resetvation a déjà été confirmé"});
        }
        booking.is_booked = true;
        await booking.save();
        
        res.status(200).send({
            message:"Reservation confirmée",
            instructions :" Veuillez payer 15% du frais de transport avant le départ et Arrivez à la station 30 minutes avant le départ.",
        });
    }catch(e){
        return res.status(500).send({
            message:"Internal Server Error", 
            error:e.message,
        });
    }
};

module.exports = {
  generatePDFTicket,
  verifyTicketCode
};
