using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using facturation_v05.Models;

namespace facturation_v05.Controllers
{
    public class FactureController : ApiController
    {
        private FacturationBDD_v02Entities db = new FacturationBDD_v02Entities();

        // GET: api/Facture
        public System.Object GetFacture()
        {
            

            var result = (from a in db.Facture
                          join b in db.Contrat on a.contrat_id equals b.contrat_id
                          join c in db.Client on b.client_id equals c.client_id
                         // join d in db.Facture_details on a.fact_id equals d.fact_id

                          select new
                          {
                              a.fact_id,
                             b.contrat_id,
                            /* d.fact_detail_id,
                             d.num_fact,
                             d.ref_fact,
                             d.quantite,*/
                            label=  b.description ,
                              d_b=b.date_debut,
                              d_f=b.date_fin,
                            f_c=  b.final_client_id,
                             price= b.prix_unitaire,
                             ref_contr= b.ref_contrat,
                            client=  c.client_nom,
                             idClient= c.client_id,
                             siren= c.client_siret,
                              tva=c.client_TVA,
                             mail= c.client_email,
                              local=c.client_adresse,
                              a.grand_total
                          }).ToList();

            return result;
        }

        // GET: api/Facture/5
        [ResponseType(typeof(Facture))]
        public IHttpActionResult GetFacture(int id)
        {
             var facture = (from a in db.Facture
                            join b in db.Contrat on a.contrat_id equals b.contrat_id
                            join c in db.Client on b.client_id equals c.client_id
                         where a.fact_id == id

                         select new
                         {
                             a.fact_id,
                             b.contrat_id,
                             label = b.description,
                             d_b = b.date_debut,
                             d_f = b.date_fin,
                             f_c = b.final_client_id,
                             price = b.prix_unitaire,
                             ref_contr = b.ref_contrat,
                             client = c.client_nom,
                             idClient = c.client_id,
                             siren = c.client_siret,
                             tva = c.client_TVA,
                             mail = c.client_email,
                             local = c.client_adresse,
                             a.grand_total
                             /* a.fact_id,
                             b.contrat_id,
                              ID =c.client_id,
                              client=c.client_nom,
                             siren= c.client_siret,
                              tva=c.client_TVA,
                              local=c.client_adresse,
                             mail= c.client_email,
                             label= b.description,
                             price= b.prix_unitaire,
                              a.grand_total */
                         }).FirstOrDefault();

            var factureDetails = (from a in db.Facture_details
                               join b in db.Facture on a.fact_id equals b.fact_id
                               join c in db.Contrat on b.contrat_id equals c.contrat_id
                               join d in db.Client on c. client_id equals d.client_id
                                  where a.fact_id == id

                                select new
                                {
                                    a.fact_detail_id,
                                    a.num_fact,
                                    a.ref_fact,
                                    a.quantite,
                                   a.date_envoie,
                                   montant_tva= (c.prix_unitaire * a.quantite) * d.client_TVA,
                                    total_ht = c.prix_unitaire * a.quantite,
                                    total_ttc= ((c.prix_unitaire * a.quantite) *d.client_TVA)+ c.prix_unitaire * a.quantite

                                }).ToList();

            return Ok(new { facture, factureDetails });

            /*   var order = (from a in db.Orders
                            where a.OrderID == id

                            select new
                            {
                                a.OrderID,
                                a.OrderNo,
                                a.CustomerID,
                                a.PMethod,
                                a.GTotal,
                                DeletedOrderItemIDs = ""
                            }).FirstOrDefault();

               var orderDetails = (from a in db.OrderItems
                                   join b in db.Items on a.ItemID equals b.ItemID
                                   where a.OrderID == id

                                   select new
                                   {
                                       a.OrderID,
                                       a.OrderItemID,
                                       a.ItemID,
                                       ItemName = b.Name,
                                       b.Price,
                                       a.Quantity,
                                       Total = a.Quantity * b.Price
                                   }).ToList();

                   return Ok(new { order, orderDetails });*/

            /* Facture facture = db.Facture.Find(id);
             if (facture == null)
             {
                 return NotFound();
             }

             return Ok(facture);*/
        }

      /*  // PUT: api/Facture/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutFacture(int id, Facture facture)
        {

            try
            {
                //Facture table


                db.Entry(facture).State = EntityState.Modified;

                //Facture_details table
                foreach (var item in facture.Facture_details)
                {
                    
                        db.Entry(item).State = EntityState.Modified;
                }


                db.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }*/
           /* if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != facture.fact_id)
            {
                return BadRequest();
            }

            db.Entry(facture).State = EntityState.Modified;
            foreach (var fa in facture.Facture_details)
            {
               db.Entry(fa).State = EntityState.Modified;
            }

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FactureExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }*/

        // POST: api/Facture
        [ResponseType(typeof(Facture))]
        public IHttpActionResult PostFacture(Facture facture)
        {
          /*  if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Facture.Add(facture);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = facture.fact_id }, facture);*/

             try
            {
                //Facture table
                if (facture.fact_id  == 0)
                    db.Facture.Add(facture);
            else
               db.Entry(facture).State = EntityState.Modified;

                //Facture_details table
                foreach (var item in facture.Facture_details)
                {
                   if (item.fact_detail_id == 0)
                        db.Facture_details.Add(item);
              else
                    db.Entry(item).State = EntityState.Modified;
                }

          
                db.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

      /*  // DELETE: api/Facture/5
        [ResponseType(typeof(Facture))]
        public IHttpActionResult DeleteFacture(int id)
        {
            Facture facture = db.Facture.Find(id);
            if (facture == null)
            {
                return NotFound();
            }

            db.Facture.Remove(facture);
            db.SaveChanges();

            return Ok(facture);
        }*/

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool FactureExists(int id)
        {
            return db.Facture.Count(e => e.fact_id == id) > 0;
        }
    }
}